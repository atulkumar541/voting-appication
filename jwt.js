const jwt = require("jsonwebtoken");

const jwtAuthMiddleware = (req, res, next) => {
  // check is token available in header
  const authorization = req.headers.authorization;
  if (!authorization) return res.status(401).json({ error: "Token not found" });
  // Extract token from request header

  const token = req.headers.authorization.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Unauthorized" });
  try {
    // verify jwt token
    const decode = jwt.verify(token, process.env.JWT_SECRATE);

    //attach token to user object
    req.user = decode;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ error: "Invalid token" });
  }
};

// function to generate token
const generateToken = (userData) => {
  // generate a new JWT Token using user data
  return jwt.sign(userData, process.env.JWT_SECRATE);
};

module.exports = { jwtAuthMiddleware, generateToken };
