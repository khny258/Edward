const db = require("../../models");

module.exports = {

    create: function(req, res) {
        

        db.EdgarTransactions.create({
            userId: req.userId,
            companyName: req.companyName,
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
    },
    findByUserId: function(req, res) {
        console.log('reached find user id backend');
        db.EdgarTransactions.find({'userId': req.params.id})
          .then(dbFinancials => res.json(dbFinancials))
          .catch(err => res.status(422).json(err));
      },

};

