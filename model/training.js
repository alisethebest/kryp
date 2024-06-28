const mongoose = require("mongoose");

const TrainingSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
  }, 
  cards: [
    {
      imagePath: {
        type: String,
        required: true,
      },
      iconImg: {
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
  
const Training = mongoose.model("training", TrainingSchema);
module.exports = Training;

