const JWT = require("jsonwebtoken");

const generateToken=(user)=>{
    const secrect = process.env.JWT_SECRET_KEY 
    const payload = {
        email: user.email,
        id:user._id
    }
    const token = JWT.sign(payload,secrect,{expiresIn:'15m'})
    return token
  }
module.exports = {generateToken}