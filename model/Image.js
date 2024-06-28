const mongoose = require('mongoose');


const imageSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: [String], // Add categories as an array of category objects
  },
  img: {
    type: Object,
    required: true,
  },
});
const Image = mongoose.model('Image', imageSchema);
module.exports = Image;




// models/Image.js
// const mongoose = require('mongoose');

// const imageSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   price: Number,
//   category: String,
//   img: {
//     data: Buffer,
//     contentType: String,
//   },
// });

// const Image = mongoose.model('Image', imageSchema);


// module.exports = Image;

