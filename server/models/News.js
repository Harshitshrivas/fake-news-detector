const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  verdict: {
    type: String,   // "REAL" or "FAKE"
    required: true
  },
  confidence: {
    type: Number,   // 0 to 100
    required: true
  },
  explanation: {
    type: String
  },
  sources: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('News', NewsSchema);