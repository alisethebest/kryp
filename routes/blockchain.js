
const router = require('express').Router();
const Blockchain = require('../model/blockchain')
const upload = require('../multerConfig')

router.post('/api/blockchain',upload.single('imagePath'), async (req, res) => {
    try {
      const { name, description,heading } = req.body;
      const imagePath = req.file ? `public/images/${req.file.filename}` : null;
      const newBot = new Blockchain({ name, description,heading, imagePath });
      await newBot.save();
      res.status(201).json(newBot);
    } catch (error) {
      res.status(500).json({ error: 'Error creating a new bot.' });
    }
  });

router.get('/api/blockchain/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const bot = await Blockchain.findById(id);
    if (!bot) {
      return res.status(404).json({ error: 'blockchain not found.' });
    }
    res.json(bot);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching blockchain.' });
  }
});
router.get('/api/blockchain/', async (req, res) => {
  try {
    const bot = await Blockchain.find();
    if (!bot) {
      return res.status(404).json({ error: 'blockchain not found.' });
    }
    res.json(bot);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching blockchain.' });
  }
});
router.put('/api/blockchain/:id',upload.single('imagePath'),  async (req, res) => {
  try {
    const { name, description ,heading} = req.body;
    const { id } = req.params;
    const imagePath = req.file ? `public/images/${req.file.filename}` : null;
    // Update bot with image path
    await Blockchain.findByIdAndUpdate(id, { name,heading, description, imagePath });

    res.json({ message: 'blockchain updated successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Error updating blockchain.' });
  }
});
// Delete a specific bot by ID
router.delete('/api/blockchain/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const bot = await Blockchain.findById(id);
      if (!bot) {
        return res.status(404).json({ error: 'blockchain not found.' });
      }
      await Blockchain.findByIdAndDelete(id);
      res.json({ message: 'blockchain deleted successfully.' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting blockchain.' });
    }
  });
    
module.exports = router;
