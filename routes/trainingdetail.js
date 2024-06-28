

const router = require('express').Router();
const Course = require('../model/trainingdetail')
const upload = require('../multerConfig')
// Create a new Course entry
// router.post('/api/courses', upload.fields([
//   { name: 'imagePath', maxCount: 1 },
// ]), async (req, res) => {
//   try {
//     const { heading, description, heading1, description1, curriculum } = req.body;

//     // Get the file paths from the uploaded images
//     const imagePath = req.file ? `public/images/${req.file.filename}` : null;

//     // Create a new Course instance
//     const newCourse = new Course({
//       heading,
//       description,
//       imagePath,
//       heading1,
//       description1,
//       curriculum,
//     });

//     // Save the new course to the database
//     const savedCourse = await newCourse.save();

//     res.status(201).json(savedCourse);
//   } catch (error) {
//     res.status(500).json({ error: 'Error creating a new course.' });
//   }
// });
// Create a new course
router.post('/api/courses',upload.single('imagePath'), async (req, res) => {
  try {
    // Parse request data
    const { heading, description, paymentPlans, features, heading1, description1, curriculum } = req.body;
    console.log( heading, description, paymentPlans, features, heading1, description1, curriculum )
    // Create a new course
    const imageP = req.file ? `public/images/${req.file.filename}` : null;
    const newCourse = new Course({
      heading,
      description,
      imagePath:imageP,
      paymentPlans,
      features,
      heading1,
      description1,
      curriculum,
    });

    // Save the new course to the database
    const savedCourse = await newCourse.save();

    res.status(201).json(savedCourse);
  } catch (error) {
    res.status(500).json({ error: 'Error creating a new course.' });
  }
});

// Get all courses
router.get('/api/courses', async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching courses.' });
  }
});

// Get a course by ID
router.get('/api/courses/:id', async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ error: 'Course not found.' });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching the course.' });
  }
});

/// Assuming you already have your Express app and middleware setup

// Update an existing course by ID
router.put('/api/courses/:id', upload.single('imagePath'), async (req, res) => {
  try {
    const courseId = req.params.id;
    const { heading, description, paymentPlans, features, heading1, description1, curriculum } = req.body;

    // Find the existing course by ID
    const existingCourse = await Course.findById(courseId);

    if (!existingCourse) {
      return res.status(404).json({ error: 'Course not found.' });
    }

    // Update the course fields
    existingCourse.heading = heading;
    existingCourse.description = description;
    existingCourse.paymentPlans = paymentPlans;
    existingCourse.features = features;
    existingCourse.heading1 = heading1;
    existingCourse.description1 = description1;
    existingCourse.curriculum = curriculum;

    // Update the image path if a new image is provided
    if (req.file) {
      existingCourse.imagePath = `public/images/${req.file.filename}`;
    }

    // Save the updated course to the database
    const updatedCourse = await existingCourse.save();

    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(500).json({ error: 'Error updating the course.' });
  }
});


// Delete a course by ID
router.delete('/api/courses/:id', async (req, res) => {
  try {
    const deletedCourse = await Course.findByIdAndDelete(req.params.id);
    if (!deletedCourse) {
      return res.status(404).json({ error: 'Course not found.' });
    }
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting the course.' });
  }
});

module.exports = router;
  