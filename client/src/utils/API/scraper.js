import axios from "axios";


export default {
    scrape: function (cik) {
       console.log('reached here')
      return axios.get("/api/scraper/edgar", cik,
      {auth: {
        username: this.props.user,
        password: this.props.user._id
      }})
    },
    search: function (searchText) {
    console.log('reached here')
   console.log(searchText);
   return axios.get("/api/scraper/edgar", searchText)
  //  {auth: {
  //    username: this.props.user,
  //    password: this.props.user._id
  //  }}
  
  
 } 
};
  