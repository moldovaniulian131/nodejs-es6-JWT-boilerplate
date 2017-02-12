/**
 * Created by Iulian Moldovan on 11/02/2017.
 */

// Dependencies
import LocalStrategy from 'passport-local';

// Models
import User from '../models/user-model';

// Create local login strategy
const loginStrategyMiddleware = new LocalStrategy({
  usernameField: 'email',
}, (email, password, done) => {
  // Check the credentials

  User.findOne({
    email
  }, (err, user) => {
    if (err) {
      done(err);
    }

    if (!user) {
      return done(null, false);
    }

    user.comparePassword(password, (err, isMatch) => {
      if (err) {
        return done(err);
      }

      return done(null, isMatch ? user : false);
    });
  });
});

export default loginStrategyMiddleware;
