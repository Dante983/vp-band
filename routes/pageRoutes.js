const express = require('express');
const router = express.Router();
const pageControllers = require('../controllers/pageControllers');

router.get('/', pageControllers.page_index);
// router.get('/gallery', pageControllers.page_gallery);


module.exports = router;