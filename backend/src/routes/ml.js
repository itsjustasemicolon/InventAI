const express = require('express');
const { authenticate, authorize } = require('../../config/auth');
const model = require('../../ml/model');
const router = express.Router();

// Demand Prediction
router.post('/predict-demand', authenticate, authorize(['admin', 'store']), async (req, res) => {
  const { store_id, item_id, date } = req.body;
  const predicted_demand = await model.predictDemand({ store_id, item_id, date });
  res.json({ predicted_demand });
});

// Stock Reordering
router.post('/reorder-stock', authenticate, authorize(['admin', 'store']), async (req, res) => {
  const { store_id, item_id, current_stock } = req.body;
  const reorder_quantity = await model.reorderStock({ store_id, item_id, current_stock });
  res.json({ reorder_quantity });
});

// Store Insights
router.get('/store-insights', authenticate, authorize(['admin', 'store']), async (req, res) => {
  const { store_id } = req.query;
  const insights = await model.storeInsights({ store_id });
  res.json({ insights });
});

module.exports = router;
