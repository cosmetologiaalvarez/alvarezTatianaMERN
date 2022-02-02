import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
import { users } from './daos/index.js';

const FbStrategy = FacebookStrategy.Strategy;

const initializePassportConfig = () => {
    passport.use('facebook', new FbStrategy({
        clientID: 471674541141856,
        clientSecret: '874776926c4f0ce203c98d1f72321220',
        callbackURL: 'https://4bb3-45-179-92-45.ngrok.io/auth/facebook/callback',
        profileFields: ['emails', 'name']
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            let db = await users.getConnection()
            let user = await db.findOne({email:profile.emails[0].value})
            if (!user) {
                user = {
                    first_name: profile.name.givenName,
                    last_name: profile.name.familyName,
                    email: profile.emails[0].value
                }
            }
            done(null, user)
        } catch (error) {
            done(error)
        }
    }))
}

passport.serializeUser(function(user, done) {
    done(null, user);
});
  
passport.deserializeUser(function(user, done) {
    done(null, user);
});

export default initializePassportConfig;