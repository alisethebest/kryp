

const router = require('express').Router();
const Mission = require('../model/mission')
const upload = require('../multerConfig')

router.post('/api/missions', upload.fields([{ name: 'imagePath', maxCount: 1 }, { name: 'images', maxCount: 10 }]), async (req, res) => {
  try {
    const {
      heading,
      text1,
      desc,
      heading2,
      text2,
      btntext,
      heading3,
      cards,
    } = req.body;
// console.log(req.files.imagePath[0],'imagePath')
// console.log(req.files.images,'imagePath')
    // Map the cards array to add the image path for each card
    const cardsWithImages = cards.map((card,index) => {
      return {
        ...card,
      imagePath: req.files.images[index] ? req.files.images[index].path : null,
      };
    });
    // Create a new Mission instance
    const newMission = new Mission({
      heading,
      text1,
      imagePath: req.files.imagePath[0] ? `public/images/${req.files.imagePath[0].filename}` : null,
      desc,
      heading2,
      text2,
      btntext,
      heading3,
      cards: cardsWithImages,
    });

    // Save the new mission to the database
    const savedMission = await newMission.save();

    res.status(201).json(savedMission);
  } catch (error) {
    res.status(500).json({ error: 'Error creating a new mission.' });
  }
});

// Get all Mission entries
router.get("/api/missions", async (req, res) => {
    try {
      const missions = await Mission.find();
      res.json(missions);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Get a Mission entry by ID
  router.get("/api/missions/:id", async (req, res) => {
    try {
      const mission = await Mission.findById(req.params.id);
      if (!mission) {
        return res.status(404).json({ error: "Mission not found" });
      }
      res.json(mission);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Update a Mission entry by ID
  router.put('/api/missions/:id', upload.fields([{ name: 'imagePath', maxCount: 1 }, { name: 'images', maxCount: 10 }]), async (req, res) => {
    try {
      const missionId = req.params.id; // Extract the mission ID from the URL
      const {
        heading,
        text1,
        desc,
        heading2,
        text2,
        btntext,
        heading3,
        cards,
      } = req.body;
  
      // Map the cards array to add the image path for each card
      const cardsWithImages = cards.map((card, index) => {
        return {
          ...card,
          imagePath: req.files.images[index] ? req.files.images[index].path : null,
        };
      });
  
      // Find the existing mission by ID
      const existingMission = await Mission.findById(missionId);
  
      if (!existingMission) {
        return res.status(404).json({ error: 'Mission not found' });
      }
  
      // Update the mission fields
      existingMission.heading = heading;
      existingMission.text1 = text1;
      existingMission.desc = desc;
      existingMission.heading2 = heading2;
      existingMission.text2 = text2;
      existingMission.btntext = btntext;
      existingMission.heading3 = heading3;
      existingMission.cards = cardsWithImages;
  
      // Update the image path if a new image is provided
      if (req.files.imagePath[0]) {
        existingMission.imagePath = `public/images/${req.files.imagePath[0].filename}`;
      }
  
      // Save the updated mission to the database
      const updatedMission = await existingMission.save();
  
      res.status(200).json(updatedMission);
    } catch (error) {
      res.status(500).json({ error: 'Error updating the mission.' });
    }
  });
  

  
  // Delete a Mission entry by ID
  router.delete("/api/missions/:id", async (req, res) => {
    try {
      const deletedMission = await Mission.findByIdAndRemove(req.params.id);
      if (!deletedMission) {
        return res.status(404).json({ error: "Mission not found" });
      }
      res.json(deletedMission);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  module.exports = router;
  