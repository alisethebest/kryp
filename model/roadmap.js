const mongoose = require('mongoose')
const RoadmapSchema = new mongoose.Schema({
  heading:{
      type: String,
      required: true,
  },
    items: [
      {
        title: {
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
      },
    ],
  });
  
const Roadmap = mongoose.model('roadmap', RoadmapSchema);
module.exports = Roadmap;
