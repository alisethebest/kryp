
const router = require('express').Router();
const Training = require('../model/training')
const upload = require('../multerConfig')

// Create a new Training entry
router.post('/api/trainings', upload.fields([{ name: 'imagePath', maxCount: 10 }, { name: 'iconImg', maxCount: 10 }]), async (req, res) => {
    try {
      const { heading, cards } = req.body;
  
      // Map the cards array to add the image path for each card
      const cardsWithImages = cards.map((card,index) => {
        return {
          ...card,
          imagePath: req.files.iconImg[index] ? `public/images/${req.files.iconImg[index].filename}` : null,
          iconImg: req.files.imagePath[index] ? `public/images/${req.files.imagePath[index].filename}` : null,
        };
      });
  
      // Create a new Training instance
      const newTraining = new Training({
        heading,
        cards: cardsWithImages,
      });
  
      // Save the new training to the database
      const savedTraining = await newTraining.save();
  
      res.status(201).json(savedTraining);
    } catch (error) {
      res.status(500).json({ error: 'Error creating a new training.' });
    }
  });
  
  // Get all Training entries
  router.get("/api/trainings", async (req, res) => {
    try {
      const trainings = await Training.find();
      res.json(trainings);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Get a Training entry by ID
  router.get("/api/trainings/:id", async (req, res) => {
    try {
      const training = await Training.findById(req.params.id);
      if (!training) {
        return res.status(404).json({ error: "Training not found" });
      }
      res.json(training);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Update a Training entry by ID
router.put('/api/trainings/:id', upload.fields([{ name: 'imagePath', maxCount: 10 }, { name: 'iconImg', maxCount: 10 }]), async (req, res) => {
    try {
      const { heading, cards } = req.body;
  
      // Map the cards array to add the image path for each card
      const cardsWithImages = cards.map((card,index) => {
        return {
          ...card,
          imagePath: req.files.iconImg[index] ? `public/images/${req.files.iconImg[index].filename}` : null,
          iconImg: req.files.imagePath[index] ? `public/images/${req.files.imagePath[index].filename}` : null,
        };
      });
  
      // Find the existing Training entry by ID
      const training = await Training.findById(req.params.id);
      if (!training) {
        return res.status(404).json({ error: "Training not found" });
      }
  
      // Update the Training fields
      training.heading = heading;
      training.cards = cardsWithImages;
  
      // Save the updated training to the database
      const updatedTraining = await training.save();
  
      res.json(updatedTraining);
    } catch (error) {
      res.status(500).json({ error: 'Error updating the training.' });
    }
  });
  
  
  
  
  
  
  
  // Delete a Training entry by ID
  router.delete("/api/trainings/:id", async (req, res) => {
    try {
      const deletedTraining = await Training.findByIdAndRemove(req.params.id);
      if (!deletedTraining) {
        return res.status(404).json({ error: "Training not found" });
      }
      res.json(deletedTraining);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });


module.exports = router;
