const express = require('express');
const { authenticate, authorize } = require('../../config/auth');
const router = express.Router();

// Update Data (Store only)
router.post('/update-data', authenticate, authorize(['store']), (req, res) => {
  // TODO: Update data in DB/model
  res.json({ message: 'Update successful' });
});

module.exports = router;
