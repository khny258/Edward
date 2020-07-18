const puppeteer = require('puppeteer');
const edgarTransactions = require('./edgarTransactions');

module.exports = {

   getInfo: (req, res) => {
    
    console.log('getInfo worked')

	try {
		(async () => {
			const browser = await puppeteer.launch();
			const page = await browser.newPage();
			await page.goto('https://www.sec.gov/Archives/edgar/data/'+req.body.cik+'/index.json');

            var mainDirectory = await page.evaluate (() => {
                let doc = JSON.parse(document.querySelector("body").textContent);
                return {
                    doc
                }
            });


            // var formFourCount = 0;
            var info = [];
            for (i=0;i<mainDirectory.doc.directory.item.length;i++) {
                console.log("main directory name: "+mainDirectory.doc.directory.item[i].name);
                await page.goto('https://www.sec.gov/Archives/edgar/data/'+req.body.cik+'/'+mainDirectory.doc.directory.item[i].name+'/index.json');

                var subDirectory = await page.evaluate (() => {
                    let doc = JSON.parse(document.querySelector("body").textContent);
                    return {
                        doc
                    }
                });
                for (j=0;j< subDirectory.doc.directory.item.length;j++) {
                    // console.log(subDirectory.doc.directory.item[j].name)
                    if (JSON.stringify(subDirectory.doc.directory.item[j].name).includes('.xml')) {
                        xmlFileName = subDirectory.doc.directory.item[j].name;
                        console.log("xmlFileName: "+xmlFileName);
                        await page.goto('https://www.sec.gov/Archives/edgar/data/'+req.body.cik+'/'+mainDirectory.doc.directory.item[i].name+'/'+xmlFileName);
                        var scrapedData = await page.evaluate (() => {
                            let documentType = ''
                            let transactionCode = ''

                            try {
                            console.log('reached3');
                            documentType = document.querySelector("documentType").textContent;
                            transactionCode = document.querySelector("transactionCode").textContent;

                            console.log(documentType);
                            } catch(err) {
                                console.log('folder did not contain form 4');
                            }

                            if (documentType === '4' && (transactionCode === 'S' || transactionCode === 'P' )) {
                                let rptOwnerName = document.querySelector("rptOwnerName").textContent;
                                let transactionShares = document.querySelector("transactionShares value").textContent;
                                let transactionDate = document.querySelector("transactionDate value").textContent;
                                let transactionPricePerShare = document.querySelector("transactionPricePerShare value").textContent;
                                let transactionCode = document.querySelector("transactionCode").textContent;
                                return {
                                    rptOwnerName,
                                    transactionShares,
                                    transactionDate,
                                    transactionPricePerShare,
                                    transactionCode
                                }
                            }

                        
            });
            if (scrapedData != undefined) {
            info.push(scrapedData);
        }
        }};
            if (info.length ===3) {
                break;
            }
            
        
        }
            browser.close();
            console.log(info);
            // edgarTransactions.create


            edgarTransactions
            .create({
                cik: '000112345',
                rptOwnerName: 'Brin Sergey',
                transactionShares: '947',
                transactionDate: '2015-10-02',
                transactionPricePerShare: '600',
                transactionCode: 'S'
            });


            
            console.log('done');
            // res.json(info);
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