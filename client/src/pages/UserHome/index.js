import React, { Component } from "react";
import { Link } from 'react-router-dom';
import style from "./style.module.css";
import { scraper as scraperAPI} from "../../utils/API";
import SearchForm from "../../components/SearchForm";
import CompaniesList from "../../components/CompaniesList";
import {List} from "../../components/List";
import { Col, Row, Container } from "../../components/Grid";

// export default ( props ) => {
class UserHome extends Component {   
    constructor(props) {
        super(props);
    };
    state = {
        companies: [],
        financialStatement:[],
        q: "",
        message: "Your search had 0 hits."
    };
    handleCIK = event => {
        event.preventDefault();
        scraperAPI
        .scrape({
            cik: event.target.name,
        })
        .then(res => {
            if (res.status === 200) {
                console.log(res.status)
                this.setState({
                    financialStatement: res.data.doc
                  })
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
                console.log(res.data)
                this.setState({
                    companies: res.data
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
        <div className="container">
            <div className='row mt-3'>
                <div className="col-md-12">    
                    <SearchForm handleSearch={this.handleSearch}
                            handleFormSubmit={this.handleFormSubmit}/>
                </div>   
            </div>
            <div className='row mt-3'>
                <div className="col-md-12">    
                    {this.state.companies.length ? (
                        <>
                        <h4>Your search resulted in {this.state.companies.length} hits.
                        </h4>

                        <List>
                            {this.state.companies.map(company => (
                                <CompaniesList
                                key={company.id}
                                company={company.companyName}
                                cik={company.cik}
                                handleCIK={this.handleCIK}
                                Button={() => (
                                    <button
                                      onClick={() => this.handleCIK()}
                                      className="btn btn-primary ml-2"
                                    >
                                      Save
                                    </button>
                                  )}
                                />
                                ))}
                        </List>
                        </>
                        ) : (
                        <h2 className="text-center">{this.state.message}</h2>
                    )}                    
                </div>
                <div className="col-md-12" >
                           {this.state.financialStatement}
                </div>
            </div> 
            
        </div>
        </>
    )
}

}

export default UserHome;


