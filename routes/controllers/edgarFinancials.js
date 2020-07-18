const db = require("../../models");

module.exports = {

    create: function(req, res) {
        db.EdgarFinancials.create(req.body)
        .then(dbTransaction => res.json(dbTransaction))
        .catch(err => res.status(422).json(err));
    }

};