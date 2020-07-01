const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();
const routes = require('./routes');

const session = require('express-session');
const initSession = require('./scripts/initSession');

const errorHandler = require('./scripts/errorHandler');

// middleware:
// on every requsest will be called in order.

// initialize session memory.
app.use(initSession(session));

// parse body middleware.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static assets (usually on heroku).
if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}

// API routes.
app.use(routes);

// Send every "lost" request to the React app.
// !Define any API routes before this runs.
app.get('*', function (req, res) {
	res.sendFile(path.join(__dirname, './client/build/index.html'));
});

// error handling, last middleware.
app.use((err, req, res, next) => errorHandler(err, req, res, next));

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/passport', {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
});

app.listen(PORT, function () {
	console.log(`\n🌎 ==> API server now on http://localhost:${PORT}\n`);
});
