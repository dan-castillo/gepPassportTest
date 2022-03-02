import passport = require('passport');
import google_strategy = require('passport-google-oauth2');


passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(user, done) {
    done(null, user);
});

passport.use(new google_strategy({
    clientID:"",
    clientSecret:"",
    callbackURL: "",
    passReqToCallback   : true
},
(request, accessToken, refreshToken, profile, done) => {
        return done(null, profile);
}
));

