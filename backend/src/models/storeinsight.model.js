const mongoose = require('mongoose');

const StoreInsightSchema = new mongoose.Schema({
  store_id: { type: String, required: true },
  insights: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now }
});

const StoreInsight = mongoose.model('StoreInsight', StoreInsightSchema);
module.exports = StoreInsight;
