import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
import { users } from './daos/index.js';
import dotenv from 'dotenv';

const FbStrategy = FacebookStrategy.Strategy;

const initializePassportConfig = () => {
    passport.use('facebook', new FbStrategy({
        clientID: process.env.FB_CLIENTID,
        clientSecret: process.env.FB_CLIENTSECRET,
        callbackURL: process.env.FB_CALLBACK_URL,
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