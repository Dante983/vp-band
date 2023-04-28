const express = require('express');
const router = express.Router();
const pageControllers = require('../controllers/pageControllers');

router.get('/', pageControllers.page_index);


module.exports = router;