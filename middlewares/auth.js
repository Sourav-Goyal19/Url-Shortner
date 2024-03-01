const { getUser } = require("../service/auth");

const restrictToLoggedIn = (req, res, next) => {
  const token = req.cookies?.token;
  console.log("token", token);
  if (!token) return res.redirect("/login");
  const user = getUser(token);
  console.log("User", user);
  if (!user) return res.redirect("/login");
  req.user = user;
  next();
};

async function checkAuth(req, res, next) {
  const token = req.cookies?.token;
  const user = getUser(token);
  req.user = user;
  next();
}

module.exports = { restrictToLoggedIn, checkAuth };
