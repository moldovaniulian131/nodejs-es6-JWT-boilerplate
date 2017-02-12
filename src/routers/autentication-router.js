/**
 * Created by Iulian Moldovan on 11/02/2017.
 */
import passport from 'passport';

// Controllers
import * as AuthenticationCtrl from '../controllers/authentication-controller';

// Middleware
const requireSignIn = passport.authenticate('local', { session: false });
const requireAuth = passport.authenticate('jwt', { session: false });

export default function (app) {
  app.post('/signIn', requireSignIn, AuthenticationCtrl.signIn);
  app.post('/signUp', AuthenticationCtrl.signUp);
  app.post('/invalidateJWT', requireAuth, AuthenticationCtrl.invalidateJWT);
}
