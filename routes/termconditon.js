const router = require('express').Router();
const TermConditon = require('../model/termConditon')

// Create a new Term and Conditon
router.post('/api/term-conditon', async (req, res) => {
    try {
      const { text,heading } = req.body;
      const newTermconditon = new TermConditon({ text,heading });
      await newTermconditon.save();
      res.status(201).json(newTermconditon);
    } catch (error) {
      res.status(500).json({ error: 'Error creating Term and Conditon.' });
    }
  });
  
  // Get the current Term and Conditon
  router.get('/api/term-conditon', async (req, res) => {
    try {
      const newTermconditon = await TermConditon.findOne();
      res.json(newTermconditon);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching Term and Conditon.' });
    }
  });
  
  // Update the Term and Conditon
  router.put('/api/term-conditon', async (req, res) => {
    try {
      const { text,heading } = req.body;
      await TermConditon.updateOne({}, { text,heading });
      res.json({ message: 'Term and Conditon updated successfully.' });
    } catch (error) {
      res.status(500).json({ error: 'Error updating Term and Conditon.' });
    }
  });
  
  // Delete the Term and Conditon
  router.delete('/api/term-conditon', async (req, res) => {
    try {
      await TermConditon.deleteOne();
      res.json({ message: 'Term and Conditon deleted successfully.' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting Term and Conditon.' });
    }
  });
  


module.exports = router;
