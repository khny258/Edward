const router = require('express').Router();
const edgarFinancials = require('../controllers/edgarFinancials')

router.route('/')
   .post(edgarFinancials.create);

router.route('/:id')
   .get(edgarFinancials.findByUserId);   

module.exports = router;