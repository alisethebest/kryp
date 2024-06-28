const router = require('express').Router();
const PrivacyPolicy = require('../model/privacypolicy')

// Create a new privacy policy
router.post('/api/privacy-policy', async (req, res) => {
    try {
      const { text,heading } = req.body;
      const newPrivacyPolicy = new PrivacyPolicy({ text,heading });
      await newPrivacyPolicy.save();
      res.status(201).json(newPrivacyPolicy);
    } catch (error) {
      res.status(500).json({ error: 'Error creating privacy policy.' });
    }
  });
  
  // Get the current privacy policy
  router.get('/api/privacy-policy', async (req, res) => {
    try {
      const privacyPolicy = await PrivacyPolicy.findOne();
      res.json(privacyPolicy);
    } catch (error) {
      res.status(500).json({ error: 'Error fetching privacy policy.' });
    }
  });
  
  // Update the privacy policy
  router.put('/api/privacy-policy', async (req, res) => {
    try {
      const { text,heading } = req.body;
      await PrivacyPolicy.updateOne({}, { text,heading });
      res.json({ message: 'Privacy policy updated successfully.' });
    } catch (error) {
      res.status(500).json({ error: 'Error updating privacy policy.' });
    }
  });
  
  // Delete the privacy policy
  router.delete('/api/privacy-policy', async (req, res) => {
    try {
      await PrivacyPolicy.deleteOne();
      res.json({ message: 'Privacy policy deleted successfully.' });
    } catch (error) {
      res.status(500).json({ error: 'Error deleting privacy policy.' });
    }
  });
  


module.exports = router;
