const router = require('express').Router();
const user = require("./user");
const scraper = require("./scraper");
const edgarTransactions = require("./edgarTransactions");
const edgarFinancials = require("./edgarFinancials");


// '/api/user' route
router.use('/user', user);

// '/api/scraper' route
router.use('/scraper', scraper);

// '/api/edgarTransactions' route
router.use('/edgarTransactions', edgarTransactions);

// '/api/edgarFinancials' route
router.use('/edgarFinancials', edgarFinancials);

// calls to '/api/ <- redundant route, for initial testing
router.route('/')
  .get((req, res) => res.json({ sample: 'data' }));

module.exports = router;
