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
        message: "",
        loading: false
    };

    handleCIK = event => {
        event.preventDefault();
        scraperAPI
        .scrape({
            cik: this.state.companies[event.target.value].cik,
            userId: this.props.user._id,
            companyName:  this.state.companies[event.target.value].companyName
        })
        .then(res => {
            if (res.status === 200) {
                console.log(res.status)
                console.log(res)
                this.setState({
                    financialStatement: res.data[0].rptOwnerName
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
                    companies: res.data,
                    loading: false
                  })

            }
        })
        .catch(err => {
            console.warn(err.response.data)
        });   
    }

    handleFormSubmit = event =>{
        event.preventDefault();
        this.setState({loading: true})
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
                <div className="col-md-12 text-light text-center">  
                    <div >
                        {this.state.loading ? <img className="img-responsive" width="75px" src="./ellipsis-spinner.gif"/>: <></> }
                    </div>
                </div>
                <div className="col-md-12 text-light text-center">    
                    {this.state.companies.length ? (
                        <>
                        <div className={`${style.freshTable}`}>
                        <h4>Your search resulted in {this.state.companies.length} hits.
                        </h4>
                        <Row className="flex-wrap-reverse">
                            <Col size="md-6">
                                <b>Company Name</b>
                            </Col>
                            <Col size="md-4">
                                <b>CIK</b>
                            </Col>
                            <Col size="md-2">
                            </Col>
                        </Row>
                        <List>
                            {this.state.companies.map(company => (
                                <CompaniesList
                                key={company.id}
                                company={company.companyName}
                                cik={company.cik}
                                Button={() => (
                                    <button
                                      onClick={this.handleCIK}
                                      className="btn btn-primary"
                                      value={company.id}
                                    >
                                      Add
                                    </button>
                                  )}
                                />
                                ))}
                        </List>
                        </div>
                        </>
                        ) : (
                        <h2 className="text-center">{this.state.message}</h2>
                    )}                    
                </div>

            </div> 
           
        </div>
        </>
    )
}

}

export default UserHome;


