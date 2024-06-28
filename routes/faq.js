
const router = require('express').Router();
const Faq = require('../model/faq')


// Create a new FAQ
router.post("/api/faqs", async (req, res) => {
  try {
    const { heading, faqs } = req.body;
    const newFaq = new Faq({ heading, faqs });
    const savedFaq = await newFaq.save();
    res.status(201).json(savedFaq);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all FAQs
router.get("/api/faqs", async (req, res) => {
  try {
    const faqs = await Faq.find();
    res.json(faqs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a FAQ
router.put("/api/faqs/:id", async (req, res) => {
  try {
    const { heading, question, answer } = req.body;
    const updatedFaq = await Faq.findByIdAndUpdate(
      req.params.id,
      { heading, $push: { faqs: { question, answer } } },
      { new: true }
    );
    res.json(updatedFaq);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete a FAQ
router.delete("/api/faqs/:id", async (req, res) => {
  try {
    const deletedFaq = await Faq.findByIdAndRemove(req.params.id);
    if (!deletedFaq) {
      return res.status(404).json({ error: "FAQ not found" });
    }
    res.json(deletedFaq);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
  