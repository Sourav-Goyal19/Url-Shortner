const express = require("express");
const myRouter = express.Router();
const { handleSignup, handleLogin } = require("../controllers/user");

myRouter.post("/", handleSignup);

myRouter.post("/login", handleLogin);

module.exports = myRouter;
