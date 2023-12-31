const express = require("express");
const myRouter = express.Router();
const { Url } = require("../models/url");

myRouter.get("/", async (req, res) => {
  const urls = await Url.find({ developedBy: req?.user?._id });
  // console.log(req.user);
  console.log(urls);
  return res.status(200).render("Home", {
    urls: urls,
  });
});

myRouter.get("/signup", (req, res) => {
  return res.status(200).render("Signup");
});

myRouter.get("/login", (req, res) => {
  return res.status(200).render("Login");
});

module.exports = myRouter;
