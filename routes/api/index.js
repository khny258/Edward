const router = require('express').Router();
const user = require("./user");

// '/api/user' route
router.use('/user', user);

// calls to '/api/ <- redundant route, for initial testing
router.route('/')
  .get((req, res) => res.json({ sample: 'data' }));

module.exports = router;
