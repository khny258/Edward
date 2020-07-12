const puppeteer = require('puppeteer');

module.exports = {

   edgar: (req, res) => {
    
    console.log('scraper-access worked')

	try {
		(async () => {
			const browser = await puppeteer.launch({
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                  ],
                });
			const page = await browser.newPage();
			await page.goto('https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK='+req.body.cik+'&type=10-Q');
			await page.click('#interactiveDataBtn');
            // page.keyboard.press('Enter');
            await page.waitForSelector('#menu_cat3');
            await page.click('#menu_cat3');
            try {
                await page.click('#r2');
            }
            catch(err) {
                await page.click('#menu_cat2');
                await page.click('#r2');                   
            }
            await page.waitForSelector('table .report');

            // get href from the selector
            var scrapedData = await page.evaluate (() => {
                let doc = document.querySelector('table .report').innerHTML;
                return {
                    doc
                }
            });
            browser.close();
            console.log(scrapedData);
            console.log('done');
            res.json(scrapedData);
		})();
	} catch (err) {
		console.log(err);
    }
},
    companySearch: (req,res) => {
        console.log("Company search worked");
        console.log(req.body.searchText);
        try {
            (async () => {
                const browser = await puppeteer.launch({
                    args: [
                        '--no-sandbox',
                        '--disable-setuid-sandbox',
                      ],
                    });
                const page = await browser.newPage();
                await page.goto('https://www.sec.gov/edgar/searchedgar/cik.htm');
                await page.type('#company', req.body.searchText);
                page.keyboard.press('Enter');
                await page.waitForSelector('table');
                // get href from the selector
                var scrapedData = await page.evaluate (() => {
                    let doc = document.querySelector('table').innerText;
                    return {
                        doc
                    };
                });
                browser.close();

                scrapedData.doc = scrapedData.doc.split("Company Name")[1];
                scrapedData.doc = scrapedData.doc.split("Perform another Company-CIK Lookup")[0];
                var companiesList  = scrapedData.doc.split(/\n/).slice(2,-2);

                let data = [];
                for (var i = 0; i < companiesList.length; i++) {
                    var split = companiesList[i].split("  ");
                    data.push({id:i,cik:split[0], companyName: split[1]});
                }               
   
                console.log(data); 
                res.json(data);
            })();
        } catch (err) {
            console.log(err);
        }


    }
};