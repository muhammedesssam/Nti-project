const categoryModel = require('../../models/categoryModel');

class Category {
  static createCategory = async (req, res) => {
    try {
      const category = await categoryModel.create(req.body);
      res.status(201).json({
        status: 'success',
        data: category,
        message: 'category created successfully',
      });
    } catch (e) {
      res.status(404).json({
        status: 'failed',
        error: e.message,
      });
    }
  };

  static getCategory = async (req, res) => {
    try {
      const { id } = req.params;
      const category = await categoryModel.findById(id);
      res.status(200).json({ status: 'success', data: category });
    } catch (e) {
      res
        .status(404)
        .json({ status: 'failed', error: e.message, message: 'invalid id' });
    }
  };

  static getAllCategories = async (req, res) => {
    try {
      const categories = await categoryModel.find();
      res.status(200).json({
        status: 'success',
        results: categories.length,
        data: categories,
      });
    } catch (e) {
      res.status(404).json({ status: 'failed', error: e.message });
    }
  };

  static updateCategory = async (req, res) => {
    try {
      const { id } = req.params;
      const category = await categoryModel.findByIdAndUpdate(id, req.body, {
        new: true,
        runValidators: true,
      });

      res.status(200).json({
        status: 'success',
        data: category,
        message: 'category name is updated successfully',
      });
    } catch (e) {
      res
        .status(404)
        .json({ status: 'failed', error: e.message, message: 'invalid id' });
    }
  };

  static deleteCategory = async (req, res) => {
    try {
      const { id } = req.params;
      const category = await categoryModel.findByIdAndDelete(id);

      res.status(204).send();
    } catch (e) {
      res
        .status(404)
        .json({ status: 'failed', error: e.message, message: 'invalid id' });
    }
  };
}

module.exports = Category;
