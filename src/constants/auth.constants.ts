export default {
  JWT_ACCESS_TOKEN_EXPIRY: '15m',
  JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET ?? 'accesstokensecret',
  JWT_ACCESS_COOKIE_EXPIRY: 15 * 60 * 1000,
};
