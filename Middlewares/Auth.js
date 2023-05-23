const jwt = require("jsonwebtoken");
const Config = require('../Config');

module.exports = (req, res, next) => {
  // req.get() help to fetch data from header
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    const error = new Error("Not authorized");
    error.statusCode = 401;
    throw error;
  }
  const token = authHeader.split(" ")[1];
  try {
    decodedToken = jwt.verify(token, Config.jwtOption.secret);
  } catch (err) {
    err.statusCode = 401;
    throw err;
  }

  if (!decodedToken) {
    const error = new Error("Not Authenticated");
    error.statusCode = 401;
    throw error;
  }

  console.log(decodedToken);

  req.userId = decodedToken._id;
  req.email = decodedToken.email;
  req.type = decodedToken.type
  next();
};
