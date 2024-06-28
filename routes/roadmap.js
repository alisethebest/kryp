
const router = require('express').Router();
const Roadmap = require('../model/roadmap')
const upload = require("../multerConfig")
// Create a new Roadmap entry
router.post('/api/roadmaps',upload.array('images'),  async (req, res) => {
  try {
    const { heading, items } = req.body;

    // Map the items array to add the image path for each item
    const itemsWithImages = items.map((item,index) => {
      return {
        ...item,
        imagePath: req.files[index] ? `public/images/${req.files[index].filename}` : null,
      };
    });

    // Create a new Roadmap instance
    const newRoadmap = new Roadmap({
      heading,
      items: itemsWithImages,
    });

    // Save the new roadmap to the database
    const savedRoadmap = await newRoadmap.save();

    res.status(201).json(savedRoadmap);
  } catch (error) {
    res.status(500).json({ error: 'Error creating a new roadmap.' });
  }
});


// Get all Roadmap items
router.get("/api/roadmaps", async (req, res) => {
  try {
    const roadmaps = await Roadmap.find();
    res.json(roadmaps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// Update a Roadmap entry by ID
router.put('/api/roadmaps/:id',upload.array('images'), async (req, res) => {
  try {
    const { heading, items } = req.body;

    // Map the items array to add the image path for each item
    const itemsWithImages = items.map((item,index) => {
      return {
        ...item,
        imagePath: req.files[index] ? `public/images/${req.files[index].filename}` : null,
      };
    });

    // Find the existing Roadmap entry by ID
    const roadmap = await Roadmap.findById(req.params.id);
    if (!roadmap) {
      return res.status(404).json({ error: "Roadmap not found" });
    }

    // Update the Roadmap fields
    roadmap.heading = heading;
    roadmap.items = itemsWithImages;

    // Save the updated roadmap to the database
    const updatedRoadmap = await roadmap.save();

    res.json(updatedRoadmap);
  } catch (error) {
    res.status(500).json({ error: 'Error updating the roadmap.' });
  }
});

// Delete a Roadmap item by ID
router.delete("/api/roadmaps/:id", async (req, res) => {
  try {
    const deletedRoadmap = await Roadmap.findByIdAndRemove(req.params.id);
    if (!deletedRoadmap) {
      return res.status(404).json({ error: "Roadmap not found" });
    }
    res.json(deletedRoadmap);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
