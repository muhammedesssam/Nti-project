const carModel = require('../../models/carModel');

class Car {
  static createCar = async (req, res) => {
    try {
      const car = await carModel.create(req.body);
      res.status(201).json({
        status: 'success',
        data: car,
        message: 'car created successfully',
      });
    } catch (e) {
      res.status(401).json({
        status: 'failed',
        error: e.message,
      });
    }
  };

  static getCar = async (req, res, next) => {
    try {
      const { id } = req.params;
      const car = await carModel.findById(id);

      res.status(200).json({ status: 'success', data: car });
    } catch (e) {
      res.status(404).json({
        status: 'failed',
        error: e.message,
        message: 'invalid id',
      });
    }
  };

  static getAllCars = async (req, res) => {
    try {
      const cars = await carModel
        .find()
        .populate({ path: 'category', select: 'name' });
      res.status(200).json({
        status: 'success',
        results: cars.length,
        data: cars,
      });
    } catch (e) {
      res.status(404).json({
        status: 'failed',
        error: e.message,
      });
    }
  };

  static updateCar = async (req, res, next) => {
    try {
      const { id } = req.params;
      const car = await carModel.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });

      res.status(200).json({
        status: 'success',
        data: car,
        message: 'car upadted successfully',
      });
    } catch (e) {
      res.status(401).json({
        status: 'failed',
        error: e.message,
        message: 'invalid id',
      });
    }
  };

  static deleteCar = async (req, res, next) => {
    try {
      const { id } = req.params;
      const car = await carModel.findByIdAndDelete(id);

      res.status(204).send();
    } catch (e) {
      res.status(401).json({
        status: 'failed',
        error: e.message,
        message: 'invalid id',
      });
    }
  };

  static userCars = async (req, res) => {
    try {
      const cars = await req.user.populate('userCars');
      res.status(200).json({
        status: 'success',
        results: users.length,
        data: cars,
      });
    } catch (e) {
      res.status(404).json({
        status: 'failed',
        error: e.message,
      });
    }
  };
}

module.exports = Car;
