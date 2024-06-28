const mongoose = require("mongoose");

const BlockchainSchema = new mongoose.Schema({
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
  
const Blockchain = mongoose.model("blockchain", BlockchainSchema);
module.exports = Blockchain;

