
const router = require('express').Router();
const MemberShip = require('../model/membership')
const upload = require('../multerConfig')
// Create a new MemberShip entry with multiple images in cards

// Define a route to create an array of objects with images
router.post('/api/memberships', upload.array('images'), async (req, res) => {
  try {
    const { heading, cards } = req.body;
    // Map the array of uploaded cards to add the image paths
    const cardsWithImages = cards.map((card, index) => ({
      imagePath: req.files[index] ? req.files[index].path : null,
      plan: card.plan,
      points: card.points,
      btntext: card.btntext,
    }));

    // Create a new MemberShip instance
    const newMembership = new MemberShip({
      heading,
      cards: cardsWithImages,
    });

    // Save the new membership to the database
    const savedMembership = await newMembership.save();

    res.status(201).json(savedMembership);
  } catch (error) {
    res.status(500).json({ error: 'Error creating a new membership.' });
  }
});

  // Get all MemberShip entries
  router.get("/api/memberships", async (req, res) => {
    try {
      const memberships = await MemberShip.find();
      res.json(memberships);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  // Get a MemberShip entry by ID
  router.get("/api/memberships/:id", async (req, res) => {
    try {
      const membership = await MemberShip.findById(req.params.id);
      if (!membership) {
        return res.status(404).json({ error: "Membership not found" });
      }
      res.json(membership);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
  
  
// Update a MemberShip entry by ID
router.put('/api/memberships/:id', upload.array('images'), async (req, res) => {
  try {
    const { heading, cards } = req.body;

    // Map the cards array to add the image path for each card
    const cardsWithImages = cards.map((card, index) => ({
      ...card,
      imagePath: req.files[index] ? req.files[index].path : null,
    }));

    // Find the existing MemberShip entry by ID
    const membership = await MemberShip.findById(req.params.id);
    if (!membership) {
      return res.status(404).json({ error: "Membership not found" });
    }

    // Update the Membership fields
    membership.heading = heading;
    membership.cards = cardsWithImages;

    // Save the updated membership to the database
    const updatedMembership = await membership.save();

    res.json(updatedMembership);
  } catch (error) {
    res.status(500).json({ error: 'Error updating the membership.' });
  }
});
  // Delete a MemberShip entry by ID
  router.delete("/api/memberships/:id", async (req, res) => {
    try {
      const deletedMembership = await MemberShip.findByIdAndRemove(req.params.id);
      if (!deletedMembership) {
        return res.status(404).json({ error: "Membership not found" });
      }
      res.json(deletedMembership);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });
  

module.exports = router;
