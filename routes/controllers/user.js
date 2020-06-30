// get reference to DB 
const db = require('../../models');
const passport = require('passport');

module.exports = {

   // login user
	login: (req, res, next) => {
      
      //validate request
		if (req.body.email && req.body.password) {
			console.log(req.body.email, req.body.password);
			db.User.authenticate(req.body.email, req.body.password, function (error, user) {
            
            // check error (including no user)
            if (error || !user) {
					var err = new Error('Wrong email or password.');
               next(err);

            // user found
				} else {
               console.log(`login: `, user._id);
               
               // save user to session to match on login
               req.session.user = user;
               //
					req.user = user;
					console.log('redirect');
					return res.json(user);
				}
         });

      // request missing fields
		} else {
			var err = new Error('All fields required.');
			err.status = 400;
			return next(err);
		}
   },

   // signup user
   create: (req, res) => {
   
      // create user in db
      db.User.create({
         email: req.body.email,
         password: req.body.password
      })

      // redirect to login
      .then(() => res.redirect(307, '/api/user/login'))
      .catch(err => res.status(401).json(err));
   },
      
   signout: (req, res) => {

      // destroy session
      req.session.destroy();

      // TO-DO: clear cookie on the client side
      req.redirect('/api/user/login');
   },
   
   // authenticate user
	authenticate: (req, res, next) => {
      console.log(req.session);
      res.json(req.session.user);
   },
};
