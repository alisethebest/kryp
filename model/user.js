const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  }, 
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type:  String,
    required: true,
  },
  role: {
    type:  String,
    required: true,
  },
  picture: {
    type:  String,
    default: ''
  },
  registration_date: {
    type:  String,
    default: new Date().toISOString()
  },
  is_logged_in: {
    type: Boolean,
    default: false
  }
});
const User = mongoose.model("User", userSchema);
module.exports = User;
