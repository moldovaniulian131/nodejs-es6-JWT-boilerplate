/**
 * Created by Iulian Moldovan on 11/02/2017.
 */

// Dependencies
import { Strategy, ExtractJwt } from 'passport-jwt';

// Models
import User from '../models/user-model';

// Config
import { SECRET } from '../config';

// Setup options for JWT Authorize Strategy
const jwtAuthOptions = {
  jwtFromRequest: ExtractJwt.fromHeader('auth_token'),
  secretOrKey: SECRET
};

// Create JWT Authorize Strategy
const authorizeStrategyMiddleware = new Strategy(jwtAuthOptions, (payload, done) => {
  // Check if the user ID in the payload is correct
  User.findById(payload.sub, (err, user) => {
    if (err) {
      return done(err, false);
    }

    // Chef if the User secret code on the payload is correct
    // By changing this secret code, all tokens for the current user are invalidated
    if (user.invKey !== payload.invKey) {
      return done('The token was invalidated!', false);
    }

    return done(null, user ? user : false);
  });
});

export default authorizeStrategyMiddleware;
