const mongoose = require('mongoose');

const DemandPredictionSchema = new mongoose.Schema({
  store_id: { type: String, required: true },
  item_id: { type: String, required: true },
  date: { type: String, required: true },
  predicted_demand: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

const DemandPrediction = mongoose.model('DemandPrediction', DemandPredictionSchema);
module.exports = DemandPrediction;
