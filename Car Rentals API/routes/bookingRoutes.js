const router = require('express').Router();
const auth = require('../app/middlewares/authMiddleware');
const bookingController = require('../app/controllers/bookingController');

router
  .route('/')
  .get(auth, bookingController.getAllBookings)
  .post(auth, bookingController.createBooking);

router
  .route('/:id')
  .get(auth, bookingController.getBooking)
  .patch(auth, bookingController.updateBooking)
  .delete(auth, bookingController.deleteBooking);

module.exports = router;
