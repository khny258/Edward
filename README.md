 [![Build Status](https://travis-ci.com/ronerlih/passport-express-mongo-react-box.svg?branch=master)](https://travis-ci.com/ronerlih/passport-express-mongo-react-box) [![Coverage Status](https://coveralls.io/repos/github/ronerlih/passport-express-mongo-react-box/badge.svg?branch=master)](https://coveralls.io/github/ronerlih/passport-express-mongo-react-box?branch=master)

## Mongo-Express-React-Passport boilerplate.
 * express backend
 * mogoose + mongodb ( users collection )
 * react ( create react app )
 * user onbaording and authentication flow.
 * server and client error handling. 
 * Travis CI + tests flow
 * express test flow with Jest + coveralls
 * react tests + coveralls

### Demo
<img src='_/flow-gif.gif' style="max-width:300px" />

### ⚙️ Installation

##### Option 1: copy from gitlab
url tbd.

  1. create git repo
  2. create heroku app + mLab addon 
  3. add repo to coveralls.io
  4. on heroku dashboard create an env var for COVERALLS_REPO_TOKEN with your token.
  5. commit and push (directly to heroku or using a pipeline from github)

##### Option 2: clone from github 
  * follow steps 1-5.

### :evergreen_tree: structure
<img src='_/folder-structure.jpg' style="max-width:500px" />

### :evergreen_tree: client structure
<img src='_/client-structure.png' style="max-width:500px" />

### 🗄 DB schemas

* DB schemas should be added to `models/CollectionName.js`

##### Users
<img src='_/users-collection.png' style="max-width:300px" />


### 🔑 Key files

* ❗️ Add `.env` file to to root project folder in order to add env vars locally (being read at index.js)

#### server side 
* 🚀 index.js : entry point, set up dev env vars and other config before starting server, run server.

* 💻 server.js parts by order (mainly):
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

* 🗄 Models folder: collections

#### client side 
* App: entry point, user state, passes to relevant components.
* Navbar container: logs every render, user onboarding bottons.
* components/protectedRoute: renders the protected page only if there is a user in the sate.
* login: class components, ..logs in users

### 📦 Services and packages:

  
  * [heroku](heroku.com) 
  * [Jest](https://jestjs.io/) (client and express tests)
  * [travis](https://travis-ci.org/)
  * [coveralls](coveralls.io) 
    * will show coverage report of both client tests and server tests (they run seperatly).

### 📓 Tests
   * **Jest** is used for both client and express.

   * Run tests from root folder:
    * on express server
      * `npm run test`
      * with run with cover report: 
      `npm run coveralls`
    * client tests locally:
      * `cd client && npm run test`
   * todo: api routes with **Supertest**.
   * todo: components test with **enzyme**.
   * coverage reports with coveralls.

### continues integration
   * tests are run by travis from the `.travis.yml` file.

### Recommended further development :
  * [Production best practices wit hexpress](https://expressjs.com/en/advanced/best-practice-performance.html)


