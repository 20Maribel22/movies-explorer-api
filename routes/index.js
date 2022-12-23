const indexRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const userRouter = require('./users');
const movieRouter = require('./movies');
const auth = require('../middlewares/auth');
const { login, createUser } = require('../controllers/users');
const NotFoundError = require('../errors/NotFoundError');
const {
  MSG_ERR_NOT_FOUND_PAGE,
} = require('../utils/messages');

indexRouter.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), login);

indexRouter.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
  }),
}), createUser);

indexRouter.use('/', auth, userRouter);
indexRouter.use('/', auth, movieRouter);

indexRouter.use('*', auth, (req, res, next) => {
  next(new NotFoundError(MSG_ERR_NOT_FOUND_PAGE));
});

module.exports = indexRouter;
