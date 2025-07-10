const express = require('express');
const cors = require('cors');
const connectDB = require('./db');
require('dotenv').config();

const app = express();
app.use(cors({ origin: '*', credentials: true }));
app.use(express.json());

// Routes
app.use('/api', require('./routes/ml'));
app.use('/api', require('./routes/admin'));
app.use('/api', require('./routes/store'));
app.use('/api', require('./routes/auth'));

// Root
app.get('/', (req, res) => res.send('Walmart-Sparkathon Backend Running'));

// Connect DB and start server
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
