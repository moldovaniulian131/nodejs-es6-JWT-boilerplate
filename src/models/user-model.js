/**
 * Created by Iulian Moldovan on 11/02/2017.
 */

// Dependencies
import mongoose from 'mongoose';
import bcrypt from 'bcrypt-nodejs';

const Schema = mongoose.Schema;

// Define the model
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  invKey: {
    type: String,
    required: true
  }
});

// On save hook, encrypt password
userSchema.pre('save', function (next) {
  const user = this;

  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }

    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) {
        next(err);
      }

      user.password = hash;
      next();
    });
  });
});

// Compare passwords helper
userSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) {
      callback(err);
    }

    callback(null, isMatch);
  });
};

export default mongoose.model('user', userSchema);
