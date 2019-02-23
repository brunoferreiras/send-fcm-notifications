import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import logger from './config/logger';
import indexRouter from './routes/index';
import notificationRouter from './routes/notificationRouter';

dotenv.config();
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use('/', indexRouter);
app.use('/notification', notificationRouter);

const normalizePort = (value) => {
  const port = parseInt(value, 10);
  if (Number.isNaN(port)) {
    return value;
  }

  if (port >= 0) {
    return port;
  }
  return false;
};

const port = normalizePort(process.env.PORT || '5000');

app.listen(port, () => {
  logger.info(`Mobile notifications listening on port ${port}`);
});

export default app;
