const router = require('express').Router();

const userController = require('../app/controllers/userController');

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

router.post('/login', userController.login);

module.exports = router;
