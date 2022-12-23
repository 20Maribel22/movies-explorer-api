const { NODE_ENV, JWT_SECRET } = process.env;

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const ConflictError = require('../errors/ConflictError');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ServerError = require('../errors/ServerError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { SECRET_CODE } = require('../utils/config');
const {
  MSG_ERR_NOT_FOUND_USER,
  MSG_ERR_INCORRECT_DATA,
  MSG_ERR_CONFLICT,
  MSG_ERR_AUTH,
  MSG_ERR_SERVER,
} = require('../utils/messages');

module.exports.getAboutUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        next(new NotFoundError(MSG_ERR_NOT_FOUND_USER));
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(MSG_ERR_INCORRECT_DATA));
      } else {
        next(new ServerError(MSG_ERR_SERVER));
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    email,
    password,
  } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    User.create({
      name,
      email,
      password: hash,
    })
      .then((document) => {
        const user = document.toObject();
        delete user.password;
        res.send({ data: user });
      })
      .catch((err) => {
        if (err.name === 'ValidationError') {
          next(new BadRequestError(MSG_ERR_INCORRECT_DATA));
        } else if (err.code === 11000) {
          next(new ConflictError(MSG_ERR_CONFLICT));
        } else {
          next(new ServerError(MSG_ERR_SERVER));
        }
      });
  })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, email } = req.body;
  const userId = req.user._id;

  User.findByIdAndUpdate(userId, { name, email }, {
    new: true,
    runValidators: true,
  })
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        next(new NotFoundError(MSG_ERR_NOT_FOUND_USER));
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(MSG_ERR_INCORRECT_DATA));
      } else {
        next(new ServerError(MSG_ERR_SERVER));
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password, next)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : SECRET_CODE, { expiresIn: '7d' });
      res
        .send({ token });
    })
    .catch(() => next(new UnauthorizedError(MSG_ERR_AUTH)));
};
