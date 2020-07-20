import axios from "axios";


export default {
    scrape: function (scraperInfo) {
       console.log('reached handle cik');
       console.log(scraperInfo);
      return axios.post("/api/scraper/getInfo", scraperInfo)
    },
    search: function (searchText) {
    console.log('reached here')
   console.log(searchText);
   return axios.post("/api/scraper/companySearch", searchText)  
  },
  scrapeLatest: function () {
    console.log('reached get latest');
   return axios.post("/api/scraper/getLatest")  
  }
};
  