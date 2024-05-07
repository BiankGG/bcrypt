const express = require("express");
const router = express.Router();
const { generateToken, verifyToken } = require("../middlewares/authMiddleware");
const users = require("../data/users");
const { secret, hashedSecret } = require("../crypto/config.js");

// console.log(users);
//get users/data/users
router.get("/", (req, res) => {
  res.json(users);
  console.log("working");
});

//new user
router.route("/login").post((req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  console.log( username);
  console.log(password);
  if (user) {
    const token = generateToken(user);
    req.session.token = token; // Almacena el token en la sesión
    res.redirect("/dashboard");
  } else {
    res.status(401).json({ mensaje: "Credenciales incorrectas" });
  }
});

router.route("/dashboard").get(verifyToken, (req, res) => {
  const userId = req.user;
  const user = users.find((user) => user.id === userId);
  if (user) {
    res.send(`
      <h1>Bienvenido, ${user.name}</h1>
      <p>ID: ${user.id}</p>
      <p>UserName: ${user.username}</p>
      <a href="/">HOME</a>
      <form action="/logout" method="post">
        <button type="submit">Cerrar sesión</button>
      </form>
    `);
  } else {
    res.status(401).json({ mensaje: "Usuario no encontrado" });
  }
});

module.exports = router;
