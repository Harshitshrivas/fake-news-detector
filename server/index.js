const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware — ye PEHLE hona chahiye
app.use(cors({
  origin: 'https://fake-news-detector-8w9y.vercel.app',
  methods: ['GET', 'POST', 'DELETE'],
  credentials: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB Connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected'))
  .catch((err) => console.log('❌ DB Error:', err));

// Routes
app.use('/api', require('./routes/analyze'));

// Test route
app.get('/', (req, res) => {
  res.send('Fake News Detector API Running 🚀');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));