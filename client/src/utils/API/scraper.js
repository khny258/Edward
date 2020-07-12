import axios from "axios";


export default {
    scrape: function (cik) {
       console.log('reached here')
       console.log(cik);
      return axios.post("/api/scraper/edgar", cik)
    },
    search: function (searchText) {
    console.log('reached here')
   console.log(searchText);
   return axios.post("/api/scraper/companySearch", searchText)  
  } 
};
  