import React, { Component } from "react";
import style from "./style.module.css";
import { feeds as feedsAPI} from "../../utils/API";
import BarChart from "../../components/BarChart";
import LineChart from "../../components/LineChart";
import TransactionsList from "../../components/TransactionsList";
import {List} from "../../components/List";



class Dash extends Component {
    constructor(props) {
        super(props);
    };
    state = {
        financials: [],
        transactions: []
    };   
    componentDidMount() {
        this.getEdgarFinancialFeeds(this.props.user._id);
        this.getEdgarTransactionFeeds(this.props.user._id);
    }

    getEdgarFinancialFeeds = userId => {
        feedsAPI.getEdgarFinancialFeeds(userId) 
          .then(res => {
            this.setState({
              financials: res.data
            })
            console.log(this.state.financials.map(({ companyName, cashOnCash }) => ({ x: companyName, y:cashOnCash/1000000  })));
        }
          )
          .catch(err => console.log(err));
      };

      getEdgarTransactionFeeds = userId => {
        feedsAPI.getEdgarTransactionFeeds(userId) 
          .then(res => {
            this.setState({
              transactions: res.data
            });
            console.log('this is transactions data')
            console.log(res);        }
          )
          .catch(err => console.log(err));
      };
    render () {

        return (
            <>  
                <div className="container">
                    <div className='row mt-3 border'>
                        <div className="col-md-6">
                            <b>Assets vs Liabilities</b>
                            <LineChart 
                            data1={this.state.financials.map(({ companyName, assetsCurrent }) => ({ x: companyName, y: parseInt(assetsCurrent) /1000000 }))}
                            data2={this.state.financials.map(({ companyName, liabilitiesCurrent }) => ({ x: companyName, y: parseInt(liabilitiesCurrent) /1000000 }))}
                            />
                        </div>
                        <div className="col-md-6">
                            <b>Cash on Cash</b>
                            <BarChart data={this.state.financials.map(({ companyName, cashOnCash }) => ({ x: companyName, y: parseInt(cashOnCash) /1000000 }))}/>
                        </div>
                    </div>
                    <div className='row mt-3 border'>
                        <div className="col-md-12">
                            <div><b>Insider Transactions</b></div>
                            <div className='row  text-center'>
                                <div className="col-md-2">Transactor</div>
                                <div className="col-md-2">Company</div>
                                <div className="col-md-2">Shares</div>
                                <div className="col-md-2">Price</div>
                                <div className="col-md-2">Type</div>
                                <div className="col-md-2">Date</div>
                            </div>

                            <div className="text-center">
                            {this.state.transactions.length ? (
                                <>
                                    <List>
                                        {this.state.transactions.map(transaction => (
                                            <TransactionsList
                                            key={transaction.id}
                                            rptOwnerName={transaction.rptOwnerName}
                                            companyName={transaction.companyName}
                                            transactionShares={transaction.transactionShares}
                                            transactionPricePerShare={transaction.transactionPricePerShare}
                                            transactionCode={transaction.transactionCode}  
                                            transactionDate={transaction.transactionDate}
                                            />
                                            ))}
                                    </List>   
                                </>
                            ) : (<></>)
                        }
                        </div>
                        </div>
                    </div>
                </div>
            
            </>
        )
    }
}

export default Dash;