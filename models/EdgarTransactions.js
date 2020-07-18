var mongoose = require('mongoose');

var EdgarTransactionsSchema = new mongoose.Schema({
    cik: {
      type: String,
      trim: true      
    },
    rptOwnerName: {
      type: String,
      trim: true
    },
    transactionShares: {
      type: String,
      trim: true
    },
    transactionDate: {
      type: String,
      trim: true
    },    
    transactionPricePerShare: {
      type: String,
      trim: true
    },  
    transactionCode: {
      type: String,
      trim: true
    },    
  });

var EdgarTransactions = mongoose.model('EdgarTransactions', EdgarTransactionsSchema);
module.exports = EdgarTransactions;