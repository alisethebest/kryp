
const router = require('express').Router();
const Contact = require('../model/contact')

// Create a new contact entry
router.post("/api/contact", async (req, res) => {
  try {
    const { name, location } = req.body;
    const newFooter = new Contact({ name, location });
    const savedFooter = await newFooter.save();
    res.status(201).json(savedFooter);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get the Footer entry
router.get("/api/contact", async (req, res) => {
  try {
    const footer = await Contact.findOne();
    res.json(footer);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update the contact entry
router.put("/api/contact", async (req, res) => {
  try {
    const { name, location } = req.body;
    const updatedFooter = await Contact.findOneAndUpdate(
      {},
      { name, location },
      { new: true }
    );
    res.json(updatedFooter);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete the contact entry
router.delete("/api/contact", async (req, res) => {
  try {
    const deletedFooter = await Footer.findOneAndRemove({});
    if (!deletedFooter) {
      return res.status(404).json({ error: "contact not found" });
    }
    res.json(deletedFooter);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

    
module.exports = router;
