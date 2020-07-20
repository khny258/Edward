const puppeteer = require('puppeteer');
const cheerio = require('cheerio');

const edgarTransactions = require('./edgarTransactions');
const edgarFinancials = require('./edgarFinancials');

module.exports = {

   getInfo: (req, res) => {
    
    console.log('getInfo worked')

	try {
		(async () => {
			const browser = await puppeteer.launch({
                args: [
                    '--no-sandbox',
                    '--disable-setuid-sandbox',
                  ],
                });
			const page = await browser.newPage();
			await page.goto('https://www.sec.gov/Archives/edgar/data/'+req.body.cik+'/index.json');

            var mainDirectory = await page.evaluate (() => {
                let doc = JSON.parse(document.querySelector("body").textContent);
                return {
                    doc
                }
            });


            var info = [];
            var filingData = 0;
            var financials = {};
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

                        if (xmlFileName.includes('FilingSummary') && filingData === 0) {
                            console.log('filingsummary found');
                            const filingSummaryContent = await page.content();
                            var $ = cheerio.load(filingSummaryContent,{
                                xmlMode: true
                            });

                            if($('InputFiles')[0].children[0].next.attribs.doctype ==='10-Q') {

                                var fileName =$('InputFiles')[0].children[0].next.attribs.original;
                                fileName = fileName.replace('.','_');
                                console.log(fileName);

                                await page.goto('https://www.sec.gov/Archives/edgar/data/'+req.body.cik+'/'+mainDirectory.doc.directory.item[i].name+'/'+fileName+'.xml', {
                                timeout: 200000});
                                const Filingcontent = await page.content();
                                var $ = cheerio.load(Filingcontent,{
                                    xmlMode: true
                                });                            


                                financials.cashOnCash = $('us-gaap\\:CashAndCashEquivalentsAtCarryingValue')[0].children[0].data;
                                financials.cashOnCashDate= $('us-gaap\\:CashAndCashEquivalentsAtCarryingValue')[0].attribs.contextRef;
                                financials.assetsCurrent = $('us-gaap\\:AssetsCurrent')[0].children[0].data;
                                financials.assetsCurrentDate = $('us-gaap\\:AssetsCurrent')[0].attribs.contextRef;
                                financials.liabilitiesCurrent = $('us-gaap\\:LiabilitiesCurrent')[0].children[0].data;
                                financials.liabilitiesCurrentDate = $('us-gaap\\:LiabilitiesCurrent')[0].attribs.contextRef;
                                financials.eps = $('us-gaap\\:EarningsPerShareDiluted')[0].children[0].data;
                                financials.epsDate = $('us-gaap\\:EarningsPerShareDiluted')[0].attribs.contextRef; 
                                
                                filingData = 1;
                            }
                        }
                        else {
                            var scrapedData = await page.evaluate (() => {
                                let documentType = ''
                                let transactionCode = ''

                                try {
                                console.log('reached for other xml docs');
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
                            if (scrapedData != undefined && info.length <3) {
                                info.push(scrapedData);
                                console.log('info pushed');
                                }
                            
                        }

        }};
            console.log('info length:',info.length);
            console.log('filingData:',filingData);
            if (info.length ===3 && filingData ===1) {
                break;
            }
            
        
        }
            browser.close();
            console.log(info);

            for (i=0;i<info.length;i++) {
                info[i].cik = req.body.cik;
                info[i].companyName = req.body.companyName;
                info[i].userId = req.body.userId;
                edgarTransactions
                .create(info[i]);
            }

            financials.cik = req.body.cik;
            financials.companyName = req.body.companyName;
            financials.userId = req.body.userId;
            edgarFinancials.create(financials);

            
            console.log('done');
            res.json('done');

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


    },
    getLatest: (req,res) => {
        console.log('reached backend of get latest');
        try {
            (async () => {
                const browser = await puppeteer.launch({
                    args: [
                        '--no-sandbox',
                        '--disable-setuid-sandbox',
                      ],
                    });
                const page = await browser.newPage();
                await page.goto('https://www.sec.gov/edgar/searchedgar/currentevents.htm');
                await page.type('#q3', '10-Q');
                page.keyboard.press('Enter');
                await page.waitForSelector('table');
                var scrapedData = await page.evaluate (() => {
                    let doc = document.querySelector('table').innerText;
                    return {
                        doc
                    };
                });
                browser.close();
                scrapedData.doc = scrapedData.doc.split("Company Name")[1];
                scrapedData.doc = scrapedData.doc.split("Perform another current events analysis?")[0];

                var latestFilingList  = scrapedData.doc.split(/\n/).slice(2,-2);

                let data = [];
                for (var i = 0; i < latestFilingList.length; i++) {
                    var split = latestFilingList[i].split("10-Q");
                    if (split[1].includes('/A')) {
                        split[1]=split[1].replace('/A','');
                    }
                    split[1]= split[1].trim();
                    doubleSplit = split[1].split('   ');
                    data.push({id:i, dateFiled:split[0].trim(), cik: doubleSplit[0], companyName: doubleSplit[1]});
                }
                console.log(data);   
                res.json(data);
            })();
        } catch (err) {
            console.log(err);
        }
    }
};