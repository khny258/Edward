const router = require('express').Router();
const scraperFunctions = require('../controllers/scraper')


router.route('/getInfo')
   .post(scraperFunctions.getInfo);

   router.route('/companySearch')
   .post(scraperFunctions.companySearch);


module.exports = router;

