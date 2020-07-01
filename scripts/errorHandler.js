module.exports = function (error, req, res, next) {
  console.log("New Error");
    if (res.headersSent) {
      console.log('error sent');
      return next(error)
    }
    console.log(`error ${error.message} will be sent`);
    res.status(401)
    res.json(error.message)
  }