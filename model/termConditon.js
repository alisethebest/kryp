const mongoose = require("mongoose");

const termConditonSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
  }, 
  text: {
    type: String,
    required: true,
  }, 
});
  
const TermConditon = mongoose.model("termConditon", termConditonSchema);
module.exports = TermConditon;

