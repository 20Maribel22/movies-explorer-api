const validator = require('validator');
const BadRequestError = require('../errors/BadRequestError');
const { MSG_ERR_INCORRECT_URL } = require('../utils/messages');

const checkUrl = (value) => {
  const result = validator.isURL(value);
  if (result) {
    return value;
  }
  throw new BadRequestError(MSG_ERR_INCORRECT_URL);
};

module.exports = checkUrl;
