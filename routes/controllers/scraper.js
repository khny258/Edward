const puppeteer = require('puppeteer');

module.exports = {

   edgar: (req, res) => {
    
    console.log('scraper-access worked')
    },
    companySearch: (req,res) => {
        console.log("Company search worked");
        console.log(req.body.searchText);
        try {
            (async () => {
                const browser = await puppeteer.launch();
                const page = await browser.newPage();
                await page.goto('https://www.sec.gov/edgar/searchedgar/cik.htm');
                await page.type('#company', req.body.searchText);
                page.keyboard.press('Enter');
                await page.waitForSelector('table');
                // get href from the selector
                var scrapedData = await page.evaluate (() => {
                    let doc = document.querySelector('table').innerHTML;
                    return {
                        doc
                    }
                });
                console.log(scrapedData);
                scrapedData.doc = scrapedData.doc.split("</pre><hr><a href=\"/edgar/searchedgar")[0];
                
                res.json(scrapedData);
            })();
        } catch (err) {
            console.log(err);
        }


    }
};

