const mongoose = require("mongoose");

const footerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  }, 
  number: {
    type: String,
    required: true,
  }, 
  
});
  
const Footer = mongoose.model("footer", footerSchema);
module.exports = Footer;

