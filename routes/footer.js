
const router = require('express').Router();
const Footer = require('../model/footer')

// Create a new Footer entry
router.post("/api/footer", async (req, res) => {
  try {
    const { email, number } = req.body;
    const newFooter = new Footer({ email, number });
    const savedFooter = await newFooter.save();
    res.status(201).json(savedFooter);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get the Footer entry
router.get("/api/footer", async (req, res) => {
  try {
    const footer = await Footer.findOne();
    res.json(footer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update the Footer entry
router.put("/api/footer", async (req, res) => {
  try {
    const { email, number } = req.body;
    const updatedFooter = await Footer.findOneAndUpdate(
      {},
      { email, number },
      { new: true }
    );
    res.json(updatedFooter);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete the Footer entry
router.delete("/api/footer", async (req, res) => {
  try {
    const deletedFooter = await Footer.findOneAndRemove({});
    if (!deletedFooter) {
      return res.status(404).json({ error: "Footer not found" });
    }
    res.json(deletedFooter);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

    
module.exports = router;
