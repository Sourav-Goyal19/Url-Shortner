require("dotenv").config();
const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT;
const myRouter = require("./routes/url");
const staticRoute = require("./routes/staticRoute");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/user");
const { connectMongoDB } = require("./connection");
const { restrictToLoggedIn, checkAuth } = require("./middlewares/auth");

connectMongoDB(process.env.MONGO_URL);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.resolve("./public")));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use("/user", userRoute);
app.use("/", checkAuth, staticRoute);
app.use("/url", restrictToLoggedIn, myRouter);

app.listen(PORT, () => console.log(`Server Started at ${PORT}`));
