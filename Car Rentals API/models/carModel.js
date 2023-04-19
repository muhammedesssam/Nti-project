const mongoose = require('mongoose');

const carSchema = mongoose.Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: Number, required: true },
  color: { type: String, required: true },
  pricePerDay: { type: Number, required: true },
  image: { type: String },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
  },
});

const carModel = mongoose.model('Car', carSchema);
module.exports = carModel;
