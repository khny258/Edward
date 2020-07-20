const router = require('express').Router();
const scraperFunctions = require('../controllers/scraper')


router.route('/getInfo')
   .post(scraperFunctions.getInfo);

router.route('/companySearch')
   .post(scraperFunctions.companySearch);

router.route('/getLatest')
   .post(scraperFunctions.getLatest);

module.exports = router;

