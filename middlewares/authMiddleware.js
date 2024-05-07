const jwt = require("jsonwebtoken");
const { secret, hashedSecret } = require("../crypto/config");
const users = require("../data/users");
const session = require("express-session");

function generateToken(user) {
  return jwt.sign({ user: user.id }, secret, {
    expiresIn: "1h",
  });
}

function verifyToken(req, res, next) {
  const token = req.session.token;
  console.log("t:", req.session.token);
  if (!token) {
    return res.status(401).json({ mensaje: "token no generado" });
  }
  //respuesta usuario
  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ mensaje: "token invalido" });
    }
    req.user = decoded.user;
    next();
  });
}

module.exports = {
  generateToken,
  verifyToken,
};
