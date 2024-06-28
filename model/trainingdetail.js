const mongoose = require("mongoose");

// Define the Course Schema
const courseSchema = new mongoose.Schema({
  heading: {
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
  paymentPlans: [
    {
      name: {
        type: String,
        required: true,
      },
      installmentAmounts: [
        {
          type: String,
          required: true,
        },
      ],
    },
  ],
  features: {
    heading1:{
      type:String,
      required:true
    },
    selfDirected: {
      type: [String],
      required: true,
    },
    heading2:{
      type:String,
      required:true
    },
    liveClasses: {
      type: [String],
      required: true,
    },
  },
  heading1:{
    type: String,
    required: true,
  },
  description1:{
    type: String,
    required: true,
  },
  curriculum: {
      type: [String],
      required: true,
  },
});

// Create the Course model
const Course = mongoose.model("Course", courseSchema);

module.exports = Course;
