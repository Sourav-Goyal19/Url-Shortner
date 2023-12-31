const express = require("express");
const path = require("path");
const app = express();
const PORT = 8001;
const myRouter = require("./routes/url");
const staticRoute = require("./routes/staticRoute");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/user");
const { connectMongoDB } = require("./connection");
const { Url } = require("./models/url");
const { restrictToLoggedIn, checkAuth } = require("./middlewares/auth");

connectMongoDB("mongodb://127.0.0.1:27017/shortUrl");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/user", userRoute);
app.use("/", checkAuth, staticRoute);
app.use("/url", restrictToLoggedIn, myRouter);

app.get("/url/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await Url.findOneAndUpdate(
    { shortId },
    { $push: { visitHistory: { timestamp: Date.now() } } }
  );
  res.redirect(entry.redirectUrl);
});

app.listen(PORT, () => console.log(`Server Started at ${PORT}`));
