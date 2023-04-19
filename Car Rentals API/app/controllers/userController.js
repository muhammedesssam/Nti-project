const userModel = require('../../models/userModel');

class User {
  static createUser = async (req, res) => {
    try {
      const user = await userModel.create(req.body);

      res.status(201).json({
        status: 'success',
        data: user,
        message: 'user created successfully',
      });
    } catch (e) {
      res.status(404).json({ status: 'failed', error: e.message });
    }
  };

  static getUser = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await userModel.findById(id);

      res.status(200).json({ status: 'success', data: user });
    } catch (e) {
      res
        .status(404)
        .json({ status: 'failed', error: e.message, message: 'invalid id' });
    }
  };

  static getAllUsers = async (req, res) => {
    try {
      const users = await userModel.find();

      res.status(200).json({
        status: 'success',
        results: users.length,
        data: users,
      });
    } catch (e) {
      res.status(404).json({ status: 'failed', error: e.message });
    }
  };

  static updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await userModel.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });

      res.status(200).json({
        status: 'success',
        data: user,
        message: 'user updated successfully',
      });
    } catch (e) {
      res
        .status(404)
        .json({ status: 'failed', error: e.message, message: 'invalid id' });
    }
  };

  static deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await userModel.findByIdAndDelete(id);

      res.status(204).send();
    } catch (e) {
      res
        .status(404)
        .json({ status: 'failed', error: e.message, message: 'invalid id' });
    }
  };

  static login = async (req, res) => {
    try {
      const user = await userModel.login(req.body.email, req.body.password);
      const token = await user.generateToken();
      res.status(200).json({ status: 'success', data: { user, token } });
    } catch (e) {}
  };
}

module.exports = User;
