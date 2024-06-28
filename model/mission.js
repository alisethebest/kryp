const mongoose = require("mongoose");

const MissionSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
  }, 
  text1: {
    type: String,
    required: true,
  }, 
  imagePath: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  heading2:{
    type:String,
    required:true
  },
  text2:{
    type:String,
    required:true
  },
  btntext:{
    type:String,
    required:true
  },
  heading3:{
    type:String,
    required:true
  },
  cards: [
    {
      imagePath: {
        type: String,
        required: true,
      },
      text: {
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
    },
  ],
});
  
const Mission = mongoose.model("mission", MissionSchema);
module.exports = Mission;

