const router = require('express').Router();
const edgarTransactions = require('../controllers/edgarTransactions')

router.route('/')
   .post(edgarTransactions.create);

module.exports = router;
