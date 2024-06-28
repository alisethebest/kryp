// routes/imageRoutes.js


// OLD CODE
const router = require('express').Router();
const multer = require('multer');
const Image = require('../model/Image');
const { findImages } = require('../controllers/imagesController');

const storage = multer.memoryStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/images');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

// Example route for image upload
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    // Check if file is uploaded successfully
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    const { title, description, price, category } = req.body;

    // Ensure that all required fields are provided
    if (!title || !description || !price || !category) {
      return res.status(400).send('Please provide all required fields.');
    }

    // Create a new Image instance
    const newImage = new Image({
      title,
      description,
      price,
      category,
      img: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
    });

    // Save the new image to the database
    await newImage.save();
    res.status(201).send('Image uploaded and saved.');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get('/images', async (req, res) => {
  try {
    const images = await Image.find(req.query);
    res.status(200).send(images);
  } catch (err) {
    res.status(400).send(err);
  }
});

router.get('/images-count', async (req, res) => {
  try {
    const images = await Image.find().count();
    res.status(200).send({counts: images});
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post('/find-images', findImages);

module.exports = router;
