import axios from "axios";


export default {
    scrape: function (cik) {
       console.log('reached handle cik');
       console.log(cik);
      return axios.post("/api/scraper/getInfo", cik)
    },
    search: function (searchText) {
    console.log('reached here')
   console.log(searchText);
   return axios.post("/api/scraper/companySearch", searchText)  
  }
};
  