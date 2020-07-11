const router = require('express').Router();
const user = require("./user");
const scraper = require("./scraper");

// '/api/user' route
router.use('/user', user);

// '/api/scraper' route
router.use('/scraper', scraper);

// calls to '/api/ <- redundant route, for initial testing
router.route('/')
  .get((req, res) => res.json({ sample: 'data' }));

module.exports = router;
