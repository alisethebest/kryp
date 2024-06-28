const mongoose = require("mongoose");

const MemberShipSchema = new mongoose.Schema({
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
      plan: {
        type: String,
        required: true,
      },
      points: [
        {
          text:{type: String,
            required: true,
          }
        }
      ],
      btntext: {
        type: String,
        required: true,
      },
    },
  ],
});
  
const Mission = mongoose.model("membership", MemberShipSchema);
module.exports = Mission;

