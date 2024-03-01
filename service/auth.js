const jwt = require("jsonwebtoken");
const secretKey = "#SouravG#";

const setUser = (user) => {
  const token = jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
    },
    secretKey
  );
  return token;
};

const getUser = (token) => {
  if (!token) {
    return null;
  }
  try {
    const user = jwt.verify(token, secretKey);
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
};

module.exports = { setUser, getUser };
