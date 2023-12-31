const express = require("express");
const { handleGenerateUrl, handleAnalytics } = require("../controllers/url");

const myRouter = express.Router();

myRouter.post("/", handleGenerateUrl);

myRouter.get("/analytics/:shortid", handleAnalytics);

module.exports = myRouter;
