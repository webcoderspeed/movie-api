import logger from './config/logger';
import prisma from './config/prisma';
import app from './createServer';

import renderTemplate from './renderTemplate';

const main = async () => {
  try {

    renderTemplate(app);

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
