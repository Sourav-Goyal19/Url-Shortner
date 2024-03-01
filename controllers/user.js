const { User } = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const { setUser, sessionIdToUserMap } = require("../service/auth");

async function handleSignup(req, res) {
  const { name, email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (user) {
    return res.render("SignUp", {
      error: "User Already Exists",
    });
  }
  await User.create({
    name,
    email,
    password,
  });
  res.status(200).redirect("/login");
}

async function handleLogin(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email, password });
  if (!user) {
    return res.render("Login", {
      error: "Invalid email or password",
    });
  }
  const token = setUser(user);
  res.cookie("token", token);
  return res.status(200).redirect("/");
}

module.exports = { handleSignup, handleLogin };
