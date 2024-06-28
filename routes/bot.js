
const router = require('express').Router();
const Bot = require('../model/bot')
const upload = require('../multerConfig')


router.post('/api/bots',upload.single('imagePath'), async (req, res) => {
    try {
      const { name, description,heading } = req.body;
      const imagePath = req.file ? `public/images/${req.file.filename}` : null;
      const newBot = new Bot({ name, description, imagePath,heading });
      await newBot.save();
      res.status(201).json(newBot);
    } catch (error) {
      res.status(500).json({ error: 'Error creating a new bot.' });
    }
  });

  router.get('/api/bots', async (req, res) => {
    try {
      const bot = await Bot.find();
      if (!bot) {
        return res.status(404).json({ error: 'Bot not found.' });
      }
      res.json(bot);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching bot.' });
    }
  });
  router.get('/api/bots/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const bot = await Bot.findById(id);
      if (!bot) {
        return res.status(404).json({ error: 'Bot not found.' });
      }
      res.json(bot);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching bot.' });
    }
  });
  router.put('/api/bots/:id',upload.single('imagePath'),  async (req, res) => {
    try {
      const { name, description,heading } = req.body;
      const { id } = req.params;
      const imagePath = req.file ? `public/images/${req.file.filename}` : null;
      // Update bot with image path
      await Bot.findByIdAndUpdate(id, { name, description, imagePath,heading });
  
      res.json({ message: 'Bot updated successfully.' });
    } catch (error) {
      res.status(500).json({ error: 'Error updating bot.' });
    }
  });

// Delete a specific bot by ID
router.delete('/api/bots/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const bot = await Bot.findById(id);
      if (!bot) {
        return res.status(404).json({ error: 'Bot not found.' });
      }
      await Bot.findByIdAndDelete(id);
      res.json({ message: 'Bot deleted successfully.' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting bot.' });
    }
  });
    
module.exports = router;
