require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const indexRouter = require('./routes/index');
const errorHandler = require('./middlewares/error');
const limiter = require('./middlewares/limiter');

const { PORT = 3001 } = process.env;
const app = express();

mongoose.connect(process.env.MONGO_URL);

app.use(helmet());
app.use(cors);
app.use(bodyParser.json());
app.use(requestLogger);
app.use(limiter);
app.use(indexRouter);
app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Сервер запущен на порту ${PORT}`);
});
