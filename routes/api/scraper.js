const router = require('express').Router();
const scraperFunctions = require('../controllers/scraper')


router.route('/edgar')
   .post(scraperFunctions.edgar);

   router.route('/companySearch')
   .post(scraperFunctions.companySearch);


module.exports = router;

// function goToEdgar(cik) {
// 	try {
// 		(async () => {
// 			const browser = await puppeteer.launch();
// 			const page = await browser.newPage();
// 			await page.goto('https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK='+cik+'&type=10-Q');
// 			await page.click('#interactiveDataBtn');
//             // page.keyboard.press('Enter');
//              await page.waitForSelector('#menu_cat3');
//             await page.click('#menu_cat3');
//             await page.click('#r2');
//             await page.waitForSelector('table .report');
//             // get href from the selector
//             var scrapedData = await page.evaluate (() => {
//                 let doc = document.querySelector('table .report').innerText;
//                 return {
//                     doc
//                 }
//             });
//             console.log(scrapedData);
//             console.log('done');
// 		})();
// 	} catch (err) {
// 		console.log(err);
// 	}
// }

// goToEdgar('0001326801');