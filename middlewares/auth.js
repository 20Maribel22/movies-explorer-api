const { NODE_ENV, JWT_SECRET } = process.env;

const jwt = require('jsonwebtoken');
const { SECRET_CODE } = require('../utils/config');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { MSG_ERR_UNAUTH } = require('../utils/messages');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError(MSG_ERR_UNAUTH);
  }
  const token = authorization.replace(/^Bearer\s/i, '');
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : SECRET_CODE);
  } catch (err) {
    next(new UnauthorizedError(MSG_ERR_UNAUTH));
  }
  req.user = payload;
  next();
};

module.exports = auth;
