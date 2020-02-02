const JwtStrat = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user.model');
const db = require('../dbconnect');

module.exports = function(passport){
  let opts = {};
  //opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = db.secret;
  passport.use(new JwtStrat(opts, (jwt_payload, done) =>{
    //console.log(jwt_payload);
    User.getUserById(jwt_payload.data._id, (err, user) =>{
      if(err)
      return done(err, false);
      if(user)
      return done(null, user);
      else
      return done(null, false);
    })
  }));
};
