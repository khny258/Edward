[![Coverage Status](https://coveralls.io/repos/github/ronerlih/passport-express-mongo-react-box/badge.svg?branch=master)](https://coveralls.io/github/ronerlih/passport-express-mongo-react-box?branch=master)
[![Build Status](https://api.travis-ci.com/ronerlih/passport-express-mongo-react-box.svg?branch=master)]()

## Readme.. TBD

### React, passport, mongo, express template

* index.js : entry point, set up dev env vars and other config before starting server, run server.

* server.js parts by order (mainly):
   * express
   * mongoose 
   * session storage (for user authentication) + hanler in scripts.
   * request body parsing middlewere (json, urlencoded)
   * serving static files
   * routes
   * serve react app (last result to pick up request)
   * error handling middleware (handler in scripts)
   * connection to db
   * listen to port (server starts)

<hr />

  * coverall specs 

  * travis

  * tests using jest client and express

  * folder structure

  * env vars (session pass)
