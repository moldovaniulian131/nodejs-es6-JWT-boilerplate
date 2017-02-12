/**
 * Created by Iulian Moldovan on 12/02/2017.
 */
import passport from 'passport';

// Controllers
import * as FooBarCtrl from '../controllers/fooBar-controller';

// Middleware
const requireSignUp = passport.authenticate('jwt', { session: false });

export default function (app) {
  // No authorization required
  app.get('/foo', FooBarCtrl.foo);

  // Authorized request
  app.get('/bar', requireSignUp, FooBarCtrl.bar);
}
