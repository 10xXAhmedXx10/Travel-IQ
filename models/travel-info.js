const mongoose = require('mongoose');

const travelInfoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  place: { type: String, required: true },
  year: { type: Number, required: true },
  img: { type: String },
  description: { type: String },
});

module.exports = mongoose.model('TravelInfo', travelInfoSchema);
