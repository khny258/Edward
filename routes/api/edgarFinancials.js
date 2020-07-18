const router = require('express').Router();
const edgarFinancials = require('../controllers/edgarFinancials')

router.route('/')
   .post(edgarFinancials.create);

module.exports = router;