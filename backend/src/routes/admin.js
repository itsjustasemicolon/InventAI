const express = require('express');
const multer = require('multer');
const { authenticate, authorize } = require('../../config/auth');
const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Upload CSV (Admin only)
router.post('/upload-csv', authenticate, authorize(['admin']), upload.single('file'), (req, res) => {
  // TODO: Process CSV and update DB/model
  res.json({ message: 'Upload successful' });
});

module.exports = router;
