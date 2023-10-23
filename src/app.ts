import express from 'express';
import dotenv from 'dotenv';
import constants from './constants';
import logger from './config/logger';
import securityMiddleware from './middlewares/security.middleware';
import { errorHandler, notFound } from './middlewares/error.middleware';
import cookieParser from 'cookie-parser';
import prisma from './config/prisma';
import routes from './routes';
import morgan from 'morgan';

dotenv.config();

export const app = express();

app.use(morgan('dev'));

app.set('view engine', 'ejs'); // Set EJS as the templating engine
app.set('views', __dirname + '/templates'); // Set the directory for your HTML templates

// security middleware (cors, xss, mongo sanitize)
securityMiddleware(app);

// setting up body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// setting up cookie parser
app.use(cookieParser());

const main = async () => {
  try {
    const { PORT } = constants.appConstants;

    app.listen(PORT, () => {
      logger.info(
        `App is running at port ${PORT} & url http://localhost:${PORT} is live. PID ${process.pid}`,
      );

      routes(app);

      // error handler
      app.use(notFound);
      app.use(errorHandler);
    });

    await prisma.$disconnect();
  } catch (error) {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  }
};

main();

// terminal close
process.on('SIGINT', function () {
  logger.info('Closing the process by user');
  process.exit(0);
});

// system close
process.on('SIGTERM', function () {
  logger.info('Closing the process by system');
  process.exit(0);
});

process.on('uncaughtException', (err: any) => {
  logger.info('UNHANDLED EXCEPTION ERROR!!!', err);
  if (err.stack) console.log(err.stack);
});

process.on('unhandledRejection', (err: any) => {
  logger.info('UNHANDLED REJECTION ERROR!!!', err);
  if (err.stack) console.log(err.stack);
});
