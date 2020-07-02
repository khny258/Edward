module.exports =  function(session, RedisStore, client){
    return session({ 
      name:'__id',
      secret: 'somevalue',
      cookie: {httpOnly: false, maxAge: 1000 * 60 * 60 * 24},
      resave: true,
      saveUninitialized: false
    })
  }