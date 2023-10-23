import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import constants from './constants';
import logger from './config/logger';
import securityMiddleware from './middlewares/security.middleware';
import { errorHandler, notFound } from './middlewares/error.middleware';

dotenv.config();

export const app = express();

const PORT = constants.appConstants.PORT;

app.set('view engine', 'ejs'); // Set EJS as the templating engine
app.set('views', __dirname + '/templates'); // Set the directory for your HTML templates

// Configure Express session
app.use(
  session({
    secret: 'webcoderspeed', // Change this to a secret key
    resave: false,
    saveUninitialized: true,
    
  })
);

// security middleware (cors, xss, mongo sanitize)
securityMiddleware(app);

// setting up body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  logger.info(
    `App is running at port ${PORT} & url http://localhost:${PORT} is live. PID ${process.pid}`,
  );

  // error handler
  app.use(notFound);
  app.use(errorHandler);
});

export default app;
