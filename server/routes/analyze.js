const express = require('express');
const router = express.Router();
const { analyzeNews } = require('../controllers/newsController');

router.post('/analyze', analyzeNews);

module.exports = router;

// ## ✅ Final Folder Structure Check

// server/
// ├── controllers/
// │   └── newsController.js  
// ├── models/
// │   └── News.js            
// ├── routes/
// │   └── analyze.js         
// ├── .env                   
// ├── index.js               
// └── package.json           