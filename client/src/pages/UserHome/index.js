import React, { Component } from "react";
import { Link } from 'react-router-dom';
import style from "./style.module.css";
import { scraper as scraperAPI} from "../../utils/API";
import SearchForm from "../../components/SearchForm";

// export default ( props ) => {
class UserHome extends Component {   
    constructor(props) {
        super(props);
    };
    state = {
        companies: [],
        q: ""
    };
    handleCIK = event => {

        scraperAPI
        .scrape({
            cik: this.target,
        })
        .then(res => {
            if (res.status === 200) {
                console.log(res.status)
            }
        })
        .catch(err => {
            console.warn(err.response.data)
        });        
    }


    handleSearch = (event) => {
        const { name, value } = event.target;
        this.setState({
          [name]: value
        });
    }

    companySearch = () => {
        scraperAPI
        .search({
            searchText: this.state.q
        })
        .then(res => {
            if (res.status === 200) {
                console.log(res.status)
                console.log(res.data.doc)
                this.setState({
                    companies: res.data.doc
                  })

            }
        })
        .catch(err => {
            console.warn(err.response.data)
        });   
    }

    handleFormSubmit = event =>{
        event.preventDefault();
        this.companySearch();
    }
    render (){
        return (
        <>
        <div className={`${style.container}`} >
            Home
        </div>
        <div>    
        <SearchForm handleSearch={this.handleSearch}
                handleFormSubmit={this.handleFormSubmit}/>
            

        <div dangerouslySetInnerHTML={{__html: this.state.companies}}>
            {/* {this.state.companies} */}
         </div>   

        </div>
        </>
    )
}

}

export default UserHome;


