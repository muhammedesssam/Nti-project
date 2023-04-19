const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
  name: { type: String },
  image: { type: String },
  description: { type: String },
});

const categoryModel = mongoose.model('Category', categorySchema);
module.exports = categoryModel;
