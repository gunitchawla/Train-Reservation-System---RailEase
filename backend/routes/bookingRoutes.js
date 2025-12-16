const express = require('express');
const router = express.Router();
const { bookTicket, getUserBookings, getAllBookings, cancelTicket } = require('../controllers/bookingController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').post(protect, bookTicket).get(protect, admin, getAllBookings);
router.route('/mybookings').get(protect, getUserBookings);
router.route('/:id').delete(protect, cancelTicket);

module.exports = router;
