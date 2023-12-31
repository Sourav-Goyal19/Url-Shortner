const express = require("express");
const { handleGenerateUrl, handleAnalytics } = require("../controllers/url");
const { Url } = require("../models/url");

const myRouter = express.Router();

myRouter.post("/", handleGenerateUrl);

myRouter.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await Url.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: { timestamp: Date.now() } } }
  );
  res.redirect(entry.redirectUrl);
});

myRouter.get("/analytics/:shortid", handleAnalytics);

module.exports = myRouter;
