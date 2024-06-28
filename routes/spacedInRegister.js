
const router = require('express').Router();
const SpacedInRegister = require('../model/spacedInRegister')
const upload = require('../multerConfig')

// Create a new SpacedInRegister entry
router.post('/api/spacedinregister', upload.fields([
    { name: 'imagePath', maxCount: 1 },
    { name: 'imagePath1', maxCount: 1 },
  ]), async (req, res) => {
    try {
      const { heading, title, subtitle, btntxt, text } = req.body;
  
      // Get the file paths from the uploaded images
      const imagePath = req.files['imagePath'] ? `public/images/${req.files['imagePath'][0].filename}` : null;
      const imagePath1 = req.files['imagePath1'] ? `public/images/${req.files['imagePath1'][0].filename}` : null;
  
      // Create a new SpacedInRegister instance
      const newSpacedInRegister = new SpacedInRegister({
        heading,
        title,
        subtitle,
        btntxt,
        text,
        imagePath,
        imagePath1,
      });
  
      // Save the new spacedInRegister to the database
      const savedSpacedInRegister = await newSpacedInRegister.save();
  
      res.status(201).json(savedSpacedInRegister);
    } catch (error) {
      res.status(500).json({ error: 'Error creating a new spacedInRegister.' });
    }
  });
  
  // Get all SpacedInRegister entries
  router.get("/api/spacedinregisters", async (req, res) => {
    try {
      const spacedInRegisters = await SpacedInRegister.find();
      res.json(spacedInRegisters);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Get a SpacedInRegister entry by ID
  router.get("/api/spacedinregisters/:id", async (req, res) => {
    try {
      const spacedInRegister = await SpacedInRegister.findById(req.params.id);
      if (!spacedInRegister) {
        return res.status(404).json({ error: "SpacedInRegister not found" });
      }
      res.json(spacedInRegister);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Update a SpacedInRegister entry by ID
router.put('/api/spacedinregister/:id', upload.fields([
    { name: 'imagePath', maxCount: 1 },
    { name: 'imagePath1', maxCount: 1 },
  ]), async (req, res) => {
    try {
      const { heading, title, subtitle, btntxt, text } = req.body;
  
      // Get the file paths from the uploaded images
      const imagePath = req.files['imagePath'] ? `public/images/${req.files['imagePath'][0].filename}` : null;
      const imagePath1 = req.files['imagePath1'] ? `public/images/${req.files['imagePath1'][0].filename}` : null;
  
      // Find the existing SpacedInRegister entry by ID
      const spacedInRegister = await SpacedInRegister.findById(req.params.id);
      if (!spacedInRegister) {
        return res.status(404).json({ error: "SpacedInRegister not found" });
      }
  
      // Update the SpacedInRegister fields
      spacedInRegister.heading = heading;
      spacedInRegister.title = title;
      spacedInRegister.subtitle = subtitle;
      spacedInRegister.btntxt = btntxt;
      spacedInRegister.text = text;
      spacedInRegister.imagePath = imagePath;
      spacedInRegister.imagePath1 = imagePath1;
  
      // Save the updated spacedInRegister to the database
      const updatedSpacedInRegister = await spacedInRegister.save();
  
      res.json(updatedSpacedInRegister);
    } catch (error) {
      res.status(500).json({ error: 'Error updating the spacedInRegister.' });
    }
  });
  // Delete a SpacedInRegister entry by ID
  router.delete("/api/spacedinregisters/:id", async (req, res) => {
    try {
      const deletedSpacedInRegister = await SpacedInRegister.findByIdAndRemove(req.params.id);
      if (!deletedSpacedInRegister) {
        return res.status(404).json({ error: "SpacedInRegister not found" });
      }
      res.json(deletedSpacedInRegister);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  

module.exports = router