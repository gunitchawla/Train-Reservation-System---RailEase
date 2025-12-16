const express = require('express');
const router = express.Router();
const { addTrain, searchTrains } = require('../controllers/trainController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').post(protect, admin, addTrain);
router.route('/search').get(searchTrains);

module.exports = router;
