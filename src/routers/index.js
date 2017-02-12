/**
 * Created by Iulian Moldovan on 11/02/2017.
 */
// Routers
import setupAuthenticationRouter from './autentication-router';
import setupFooBarRouter from './fooBar-router';

export default function (app) {
  setupAuthenticationRouter(app);
  setupFooBarRouter(app);
}
