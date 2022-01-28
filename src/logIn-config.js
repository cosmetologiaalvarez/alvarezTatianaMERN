import passport from 'passport';
import FacebookStrategy from 'passport-facebook';
import { users } from './daos/index.js';

const FbStrategy = FacebookStrategy.Strategy;

const initializePassportConfig = () => {
    passport.use('facebook', new FbStrategy({
        clientID: 471674541141856,
        clientSecret: '874776926c4f0ce203c98d1f72321220',
        callbackURL: 'https://609d-45-179-92-45.ngrok.io/auth/facebook/callback',
        profileFields: ['emails']
    }, async (accessToken, refreshToken, profile, done) => {
        try {
            let user = await user.findOne({email: profile.email})
            done(null, user);
        } catch (error) {
            done(error);
        }
    }))
}

export default initializePassportConfig;