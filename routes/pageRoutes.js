const express = require('express');
const router = express.Router();
const pageControllers = require('../controllers/pageControllers');

router.get('/', pageControllers.page_index);
router.get('/events', pageControllers.page_events);
router.get('/contact', pageControllers.page_contact);
router.post('/contact', pageControllers.page_contact_post);


module.exports = router;