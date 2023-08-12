const express = require('express');
const router = express.Router();

// routes/api.js
const Event = require('../models/events'); // Replace with your model file path

// routes/api.js
router.get('/index-events', async (req, res) => {
    try {
      const events = await Event.find();
      res.json(events);
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  

module.exports = router;