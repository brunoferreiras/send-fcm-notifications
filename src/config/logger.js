import { createLogger, format, transports } from 'winston';
import fs from 'fs';
import {} from 'winston-daily-rotate-file';

const logDir = 'logs';

const createDirectory = () => (!fs.existsSync(logDir) ? fs.mkdirSync(logDir) : null);

const dailyRotateFileTransport = new transports.DailyRotateFile({
  filename: `${logDir}/%DATE%.log`,
  datePattern: 'YYYY-MM-DD',
});

createDirectory();

const logger = createLogger({
  level: process.env.NODE_ENV === 'development' ? 'verbose' : 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
  ),
  transports: [
    new transports.Console({
      level: 'info',
      format: format.combine(
        format.colorize(),
        format.json(),
        format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
      ),
    }),
    dailyRotateFileTransport,
  ],
});

export default logger;
