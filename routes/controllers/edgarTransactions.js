const db = require("../../models");

module.exports = {

    create: function(req, res) {
        

        db.EdgarTransactions.create({
            cik: req.cik,
            rptOwnerName: req.rptOwnerName,
            transactionShares: req.transactionShares,
            transactionDate: req.transactionDate,
            transactionPricePerShare: req.transactionPricePerShare,
            transactionCode: req.transactionCode       
        })
        .then(console.log("this is db transactions:", req))
        .catch(err =>
            res.status(422).json(err));
    }

};

