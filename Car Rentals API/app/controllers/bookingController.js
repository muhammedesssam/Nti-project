const bookingModel = require('../../models/bookingModel');

class Booking {
  static createBooking = async (req, res) => {
    try {
      const booking = await bookingModel.create({
        car: req.body.car,
        user: req.user._id,
        bookingDate: req.body.bookingDate,
      });

      res.status(201).json({
        status: 'success',
        data: booking,
        message: 'booking created successfully',
      });
    } catch (e) {
      res.status(401).json({
        status: 'failed',
        error: e.message,
      });
    }
  };

  static getBooking = async (req, res, next) => {
    try {
      const { id } = req.params;
      const booking = await bookingModel.findById(id).populate('car user');

      res.status(200).json({ status: 'success', data: booking });
    } catch (e) {
      res.status(404).json({
        status: 'failed',
        error: e.message,
        message: 'invalid id',
      });
    }
  };

  static getAllBookings = async (req, res) => {
    try {
      const bookings = await bookingModel
        .find()
        .populate('car user')
        .sort('-bookingDate');
      res.status(200).json({
        status: 'success',
        results: bookings.length,
        data: bookings,
      });
    } catch (e) {
      res.status(404).json({
        status: 'failed',
        error: e.message,
      });
    }
  };

  static updateBooking = async (req, res, next) => {
    try {
      const { id } = req.params;
      const booking = await bookingModel.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });

      res.status(200).json({
        status: 'success',
        data: booking,
        message: 'booking updated successfully',
      });
    } catch (e) {
      res.status(401).json({
        status: 'failed',
        error: e.message,
        message: 'invalid id',
      });
    }
  };

  static deleteBooking = async (req, res, next) => {
    try {
      const { id } = req.params;
      const booking = await bookingModel.findByIdAndDelete(id);

      res.status(204).send();
    } catch (e) {
      res.status(401).json({
        status: 'failed',
        error: e.message,
        message: 'invalid id',
      });
    }
  };
}

module.exports = Booking;
