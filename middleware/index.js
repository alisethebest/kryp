const jwt = require("jsonwebtoken");
const User = require('../model/user')

const auth = async(req, res, next) => {
    const token = req.header("x-auth-token");
    if (!token)
    return res.status(401).send("Access denied. Not authenticated...");
    try {
      const jwtSecretKey = process.env.JWT_SECRET_KEY;
      const decoded = jwt.verify(token, jwtSecretKey);
      let user = await User.findById(decoded._id).select('-password');
      req.user = user;
      next();
    } catch (ex) {
      res.status(400).send("Invalid auth token...");
    }
  };
  
  module.exports = {auth}