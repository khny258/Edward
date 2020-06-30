const router = require('express').Router();
const API = require('./api');
const path = require('path');

router.use('/api', API);

router.get('/', (req, res) =>
	res.sendFile(path.join(__dirname, './client/build/index.html'))
);

module.exports = router;
