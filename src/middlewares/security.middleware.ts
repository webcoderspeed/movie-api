import cors from 'cors';
import mongoSanitize from 'express-mongo-sanitize';
import { Application } from 'express';
import constants from '../constants';

const {
  appConstants: { IS_PROD, DEV_ORIGIN, PROD_ORIGIN },
} = constants;

const corsOptions = {
  origin: IS_PROD ? PROD_ORIGIN : DEV_ORIGIN,
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 204,
  allowedHeaders: [
    'Origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'Authorization',
    'Access-Control-Allow-Headers',
  ],
};

const securityMiddleware = (app: Application) => {
  // removes any chars starting with dollar or dot
  app.use(mongoSanitize());

  // remove x-powered-by
  app.disable('x-powered-by');

  app.use(cors(corsOptions));
};

export default securityMiddleware;
