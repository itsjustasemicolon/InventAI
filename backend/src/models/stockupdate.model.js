const mongoose = require('mongoose');

const StockUpdateSchema = new mongoose.Schema({
  store_id: { type: String, required: true },
  item_id: { type: String, required: true },
  date: { type: String, required: true },
  stock: { type: Number, required: true },
  updatedAt: { type: Date, default: Date.now }
});

const StockUpdate = mongoose.model('StockUpdate', StockUpdateSchema);
module.exports = StockUpdate;
