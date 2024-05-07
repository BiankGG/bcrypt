const express = require("express");
const session = require("express-session");
const app = express();
const users = require("./data/users.js");
const { secret, hashedSecret } = require("./crypto/config.js");
const usersRoutes = require("./routes/users");

console.log(users);

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

app.use("/users", usersRoutes);

app.use(
  session({
    secret: secret,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.get("/", (req, res) => {
  const loginForm = `
  <form action="/users/login" method="post">
  <label for="username">User:</label>
  <input type="text" id="username" name="username" required><br>

  <label for="password">Password:</label>
  <input type="password" id="password" name="password" required><br>

  <button type="submit">Log in</button>
</form>
    <a href ="/dashboard">dashboard</a>
    `;
  res.send(loginForm);
});

app.listen(3000, (req, res) => {
  console.log("Server on http://localhost/3000");
});
