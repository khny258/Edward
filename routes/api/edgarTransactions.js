const router = require('express').Router();
const edgarTransactions = require('../controllers/edgarTransactions')

router.route('/')
   .post(edgarTransactions.create);

router.route('/:id')
   .get(edgarTransactions.findByUserId);   

module.exports = router;
