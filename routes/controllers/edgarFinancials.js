const db = require("../../models");

module.exports = {

    create: function(req, res) {
        db.EdgarFinancials.create(
            req
            )
        .then('edgar financials controller called: ',console.log(req))
        .catch(err => res.status(422).json(err));
    },
    findByUserId: function(req, res) {
        console.log('reached find user id backend');
        db.EdgarFinancials.find({'userId': req.params.id})
          .then(dbFinancials => res.json(dbFinancials))
          .catch(err => res.status(422).json(err));
      },

};