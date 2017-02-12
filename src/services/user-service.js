/**
 * Created by Iulian Moldovan on 11/02/2017.
 */
import jwt from 'jwt-simple';
import randomstring from 'randomstring';

import { SECRET } from '../config';

// Generate JWT token from user object
export function generateJWT(user) {
  const timestamp = new Date().getTime();
  const {
    id,
    invKey
  } = user;

  return jwt.encode({
    invKey,
    sub: id,
    iat: timestamp
  }, SECRET);
}

// Generate invalidation key used for JWT invalidation
export function generateInvKey() {
  return randomstring.generate();
}
