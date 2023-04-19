const mongoose = require('mongoose');

const bookingSchema = mongoose.Schema({
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  bookingDate: {
    type: Date,
    required: true,
  },
});

const bookingModel = mongoose.model('Booking', bookingSchema);
module.exports = bookingModel;
