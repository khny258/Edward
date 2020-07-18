const router = require('express').Router();
const user = require("./user");
const scraper = require("./scraper");
const edgarTransactions = require("./edgarTransactions");


// '/api/user' route
router.use('/user', user);

// '/api/scraper' route
router.use('/scraper', scraper);

// '/api/edgartransactions' route
router.use('/edgarTransactions', edgarTransactions);


// calls to '/api/ <- redundant route, for initial testing
router.route('/')
  .get((req, res) => res.json({ sample: 'data' }));

module.exports = router;
