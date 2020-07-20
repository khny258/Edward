import React, { Component } from "react";
import { Link } from 'react-router-dom';
import style from "./style.module.css";
import { scraper as scraperAPI} from "../../utils/API";
import SearchForm from "../../components/SearchForm";
import CompaniesList from "../../components/CompaniesList";
import LatestFilingList from "../../components/LatestFilingList";
import {List} from "../../components/List";
import { Col, Row, Container } from "../../components/Grid";

let state = {
    companies: [],
    financialStatement:[],
    q: "",
    latestFilings: [],
    loading: false,
};

// export default ( props ) => {
class UserHome extends Component {   
    constructor(props) {
        super(props);
        this.state = state;
    };

    componentWillUnmount() {
        // Remember state for the next mount
        state = this.state;
      }
      

    latestFilingInfo = () => {
        scraperAPI
        .scrapeLatest()
        .then(res => {
            if (res.status === 200) {
                console.log(res)
                this.setState({
                    latestFilings: res.data,
                    loading: false
                  })

            }     
        })
        .catch(err => {
            console.warn(err.response.data)
        }); 
    }

    componentDidMount() {
        console.log("mounting time length",this.state.latestFilings.length);
        if (this.state.latestFilings.length===0) { 
        this.latestFilingInfo();
        this.setState({loading: true});
          }
    }

    handleCIK = event => {
        event.preventDefault();
        this.setState({
            loading: true
          })

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
                    loading: false
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
                        {this.state.loading ? <span className='text-dark'>Edward is on a quick run  <img className="img-responsive" width="75px" src="./ellipsis-spinner.gif"/></span> : <></> }
                    </div>
                </div>
                <div className="col-md-12 text-dark text-center">    
                    {this.state.companies.length ? (
                        <>
                        <Row className="flex-wrap-reverse">
                            <Col size="md-12"><h4><b>Your search resulted in {this.state.companies.length} hits.</b></h4></Col>
                        </Row>

                        <div className='border'>
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
                                      className="btn"
                                      value={company.id}
                                      style={{borderColor: '#6f2da8', color: '#6f2da8'} }
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
                        <>
                        
                        {this.state.latestFilings.length ? (
                        <>
                            <Row className="flex-wrap-reverse">
                            <Col size="md-3">
                                <h4><b className="text-dark">Latest SEC Filings</b></h4>
                            </Col> 
                            </Row>
                        <div className='border'>

                        <Row className="flex-wrap-reverse">
                            <Col size="md-4">
                                <b>Company Name</b>
                            </Col>
                            <Col size="md-4">
                                <b>CIK</b>
                            </Col>
                            <Col size="md-4">
                                <b>Filing Date</b>
                            </Col>
                        </Row>
                        <List>
                            {this.state.latestFilings.map(company => (
                                <LatestFilingList
                                key={company.id}
                                company={company.companyName}
                                cik={company.cik}
                                filingDate={company.dateFiled}
                                // Button={() => (
                                //     <button
                                //       onClick={this.handleCIK}
                                //       className="btn"
                                //       value={company.id}
                                //       style={{borderColor: '#151A6A', color: '#151A6A'} }
                                //     >
                                //       Add
                                //     </button>
                                //   )}
                                />
                                ))}
                            </List>
                            </div>
                            </>):(<></>)
                        }
                        </>
                        //this is the end
                    )}                    
                </div>

            </div> 
           
        </div>
        </>
    )
}

}

export default UserHome;


