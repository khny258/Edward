const router = require('express').Router();
const scraperFunctions = require('../controllers/scraper')


router.route('/edgar')
   .post(scraperFunctions.edgar);

   router.route('/companySearch')
   .post(scraperFunctions.companySearch);


module.exports = router;

