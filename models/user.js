const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

const UnauthorizedError = require('../errors/UnauthorizedError');
const { MSG_ERR_INCORRECT_EMAIL, MSG_ERR_AUTH } = require('../utils/messages');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: (value) => validator.isEmail(value),
        message: MSG_ERR_INCORRECT_EMAIL,
      },
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
  },
  { versionKey: false },
);

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
) {
  return this.findOne({ email })
    .select('+password')
    .then((document) => {
      if (!document) {
        throw new UnauthorizedError(MSG_ERR_AUTH);
      }
      return bcrypt.compare(password, document.password).then((matched) => {
        if (!matched) {
          throw new UnauthorizedError(MSG_ERR_AUTH);
        }

        const user = document.toObject();
        delete user.password;
        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
