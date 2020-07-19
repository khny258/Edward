import axios from "axios";

export default {

    getEdgarFinancialFeeds: function (userId) {
        console.log('reached edgar financials ',userId);
        return axios.get("/api/edgarFinancials/"+userId);
    },
    getEdgarTransactionFeeds: function (userId) {
        console.log('reached edgar financials ',userId);
        return axios.get("/api/edgarTransactions/"+userId);
    }

};