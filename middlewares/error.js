const { MSG_ERR_SERVER } = require('../utils/messages');

const errorHandler = (err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = status === 500 ? MSG_ERR_SERVER : err.message;
  res.status(status).send({ message });
  next();
};

module.exports = errorHandler;
