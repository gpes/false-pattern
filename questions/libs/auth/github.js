const passport = require('passport')
const GithubStrategy = require('passport-github').Strategy;

module.exports = app => {


    passport.serializeUser((user, done) => {
        done(null, user._id);
    })
    
    passport.deserializeUser((id, done) => {
        done(null, id);
    })
    
    const configObj = {
        clientID: '3424b72b630868a8f36d',
        clientSecret: '5432b6a5c866eb64bca0ea063a51ddaf63f5a848',
        // callbackURL: 'https://termsq.herokuapp.com/auth/github/callback'
        callback: 'http://localhost:3000/auth/github/callback'
    }
    
    passport.use(new GithubStrategy(configObj, async (accessToken, refreshToken, profile, done) => {
        console.log("auth Github: " + JSON.stringify(profile))
        const userObj = {
            email: profile.emails != undefined ? profile.emails[0].value : '',
            displayName: profile.displayName != undefined ? profile.displayName : '',
            username: profile.username != undefined ? profile.username : '',
            public_repos: profile._json.public_repos
        }
        // console.log("auth Github: " + JSON.stringify(userObj))
        
        let usuarioRepository = app.repositories.usuario;
        let usuario = await usuarioRepository.create(userObj);

        return done(null, usuario);
    }));

    return passport;
}
