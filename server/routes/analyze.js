const express = require('express');
const router = express.Router();
const { analyzeNews, getHistory, deleteHistory } = require('../controllers/newsController');

router.post('/analyze', analyzeNews);
router.get('/history', getHistory);
router.delete('/history/:id', deleteHistory);

module.exports = router;
          