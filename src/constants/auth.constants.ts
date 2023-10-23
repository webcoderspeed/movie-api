export default {
  JWT_ACCESS_TOKEN_EXPIRY: 10 * 60 * 1000,
  JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET ?? 'accesstokensecret',
};
