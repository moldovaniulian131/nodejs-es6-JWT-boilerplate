/**
 * Created by Iulian Moldovan on 11/02/2017.
 */

// Models
import User from '../models/user-model';

// Utils
import { generateJWT, generateInvKey } from '../services/user-service';

// Sign up route
export function signUp(req, res, next) {
  const {
    body: {
      email,
      password
    }
  } = req;

  // Check if the user already exists
  User.findOne({ email }, (err, existingUser) => {
    if (err) {
      return next(err);
    }

    // Send the 422 (Unprocessable entity) when the user is already registered
    if (existingUser) {
      return res.status(422).send({ error: 'Email is in use!' });
    }

    // Create a new user based on the provided email and password
    const user = new User({
      email,
      password,
      invKey: generateInvKey()
    });

    // Save user data
    user.save(err => {
      if (err) {
        return next(err);
      }

      // Return generated JWT token
      res.json({ token: generateJWT(user) });
    });
  });
}

// Sign in route
export function signIn(req, res) {
  // Return generated JWT token
  res.json({ token: generateJWT(req.user) });
}

// Invalidate JWT token.
// Will do a logout on all devices as the invalidation code is regenerated
export function invalidateJWT(req, res, next) {
  const {
    user: {
      email
    }
  } = req;

  User.findOne({ email }, (err, user) => {
    if (err) {
      return next(err);
    }

    // Invalidate old JWT token
    user.invKey = generateInvKey();
    user.save(err => {
      if (err) {
        return next(err);
      }

      res.json({ success: true });
    });
  });
}
