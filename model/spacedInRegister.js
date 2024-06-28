const mongoose = require("mongoose");

const SpacedInRegisterSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
  }, 
  title: {
    type: String,
    required: true,
  }, 
  subtitle: {
    type: String,
    required: true,
  }, 
  btntxt: {
    type: String,
    required: true,
  }, 
  text: {
    type: String,
    required: true,
  }, 
  imagePath: {
    type: String,
    required: true,
  },
  imagePath1: {
    type: String,
    required: true,
  },
  
});
  
const SpacedInReister = mongoose.model("spaceinregister", SpacedInRegisterSchema);
module.exports = SpacedInReister;

