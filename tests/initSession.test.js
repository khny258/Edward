const initSession = require('../scripts/initSession')
const session = require('express-session')

describe("Server session tests", () => {
  describe("Initialization", () => {
    it("should create a session object", () => {
      const sessionInstance = initSession(session);
      console.log(sessionInstance)
    });
   })
});

// more server unit tests: 
// test structure: AAA -> arrange, act, assert.
// test ranges: initilazation, positive, negative, error.
// server side tests: 
//    test internal processes -> scripts
//    test routes
//    test errors

// describe("further tests", () => {
//    it("should throw an error...", () => {
//    const cb = () => `call initi session and create an error`;
//    const err = new Error("Expected...");

//    expect(cb).toThrow(err);
//    });
// });
