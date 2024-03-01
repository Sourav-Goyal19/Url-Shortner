const { Url } = require("../models/url");
const shortid = require("shortid");

async function handleGenerateUrl(req, res) {
  const redirectUrl = req.body.url;
  if (!redirectUrl) {
    res.status(400).json({
      message: "Url is required",
    });
  }
  const shortId = shortid(8);
  await Url.create({
    shortId: shortId,
    redirectUrl: redirectUrl,
    visitHistory: [],
    developedBy: req.user._id,
  });
  // const urls = await Url.find({ developedBy: req?.user?._id });
  return res.render("NewUrl", {
    id: shortId,
    port: process.env.PORT,
  });
}

async function handleAnalytics(req, res) {
  const shortId = req.params.shortid;
  const entry = await Url.find({ shortId });
  console.log(entry);
  return res.status(200).json(entry[0].visitHistory.length);
}

module.exports = { handleGenerateUrl, handleAnalytics };
