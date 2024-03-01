const express = require("express");
const myRouter = express.Router();
const { handleSignup, handleLogin } = require("../controllers/user");

myRouter.post("/signup", handleSignup);

myRouter.post("/login", handleLogin);

myRouter.post("/logout", (req, res) => {
  res.clearCookie("token");
  return res.redirect("/login");
});

module.exports = myRouter;
