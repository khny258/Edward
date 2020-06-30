module.exports = function (error, req, res, next) {
  console.log("\n\n\n\n---\nerr handler called");
    if (res.headersSent) {
      console.log('error sent');
      return next(error)
    }
    console.log('error will be sent');
    res.status(500)
    console.log(error)
    res.send(error.toString())
  }