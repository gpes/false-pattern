const passport = require('passport')
const GithubStrategy = require('passport-github').Strategy;

passport.serializeUser((profile, done) => {
    done(null, profile.displayName);
})

passport.deserializeUser((displayName, done) => {
    done(null, displayName);
})

const configObj = {
    clientID: '3424b72b630868a8f36d',
    clientSecret: '5432b6a5c866eb64bca0ea063a51ddaf63f5a848',
    callbackURL: 'http://127.0.0.1:3000/auth/github/callback'
}

passport.use(new GithubStrategy(configObj, (accessToken, refreshToken, profile, done) => {
    console.log("auth Github: " + profile.displayName)

    return done(null, profile);
}));

module.exports = passport;