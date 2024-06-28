const mongoose = require("mongoose");

const BotSchema = new mongoose.Schema({
    heading: {
    type: String,
    required: true,
  }, 
    name: {
    type: String,
    required: true,
  }, 
  description: {
    type: String,
    required: true,
  }, 
  imagePath: {
    type: String,
    required: true,
  }, 
});
  
const Bot = mongoose.model("bot", BotSchema);
module.exports = Bot;

