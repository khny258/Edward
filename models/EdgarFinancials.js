var mongoose = require('mongoose');

var EdgarFinancialsSchema = new mongoose.Schema({
    userId: {
      type: String,
      trim: true      
    },
    companyName: {
      type: String,
      trim: true      
    },
    cik: {
        type: String,
        trim: true      
      },
      cashOnCash: {
        type: String,
        trim: true
      },
      CashOnCashDate: {
        type: String,
        trim: true
      },
      assetsCurrent: {
        type: String,
        trim: true
      },    
      assetsCurrentDate: {
        type: String,
        trim: true
      },  
      liabilitiesCurrent: {
        type: String,
        trim: true
      },   
      liabilitiesCurrentDate: {
        type: String,
        trim: true
      },  
      eps: {
        type: String,
        trim: true
      },   
      epsDate: {
        type: String,
        trim: true
      },  
    
});

var EdgarFinancials = mongoose.model('EdgarFinancials', EdgarFinancialsSchema);
module.exports = EdgarFinancials;