// auth.js
var passport = require("passport");
var passportJWT = require("passport-jwt");
var User = require("./models/User.js");
var cfg = require("./config.js");
var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;
var params = {
    secretOrKey: cfg.secret,
    jwtFromRequest: ExtractJwt.fromAuthHeader()
};

var strategy = new Strategy(params, function(payload, done) {
    User.findById(payload.id, function(err, user) {
        if (err) return done(err, false);
        if (user) return done(null, user);
        else return done(null, false);
    });
});
passport.use(strategy);

module.exports = {
    initialize: function() {
        return passport.initialize();
    },
    authenticate: function() {
        return passport.authenticate("jwt", cfg.session);
    }
};