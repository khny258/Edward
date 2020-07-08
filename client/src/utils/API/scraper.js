import axios from "axios";

export default {
    scrape: function (cik) {
      return axios.post("/api/scraper/edgar", cik)
    }  
  };
  