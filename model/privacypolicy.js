const mongoose = require("mongoose");

const PrivacyPolicySchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
  }, 
  text: {
    type: String,
    required: true,
  }, 
});
  
const PrivacyPolicy = mongoose.model("privacypolicy", PrivacyPolicySchema);
module.exports = PrivacyPolicy;

