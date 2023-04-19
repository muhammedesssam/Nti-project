const router = require('express').Router();
const auth = require('../app/middlewares/authMiddleware');

const carController = require('../app/controllers/carController');

router.route('/').get(carController.getAllCars).post(carController.createCar);

router
  .route('/:id')
  .get(carController.getCar)
  .patch(carController.updateCar)
  .delete(carController.deleteCar);

module.exports = router;
