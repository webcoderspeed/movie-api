export default {
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT ?? 1337,
  PROD_ORIGIN: process.env.PROD_ORIGIN,
  DEV_ORIGIN: process.env.DEV_ORIGIN ?? 'http://localhost:3000',
  IS_PROD: process.env.NODE_ENV === 'production',
};
