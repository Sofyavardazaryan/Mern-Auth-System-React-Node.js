const jwt = require("jsonwebtoken");

const generateAccessToken = (user) =>
  jwt.sign(
    { id: user._id, email: user.email },
    process.env.ACCESS_SECRET,
    { expiresIn: "15m" }
  );

const generateRefreshToken = (user) =>
  jwt.sign(
    { id: user._id, email: user.email },
    process.env.REFRESH_SECRET,
    { expiresIn: "7d" }
  );

module.exports = {
  generateAccessToken,
  generateRefreshToken,
};
