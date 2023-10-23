import { Express } from 'express';
import userRoutes from './user.routes';
import templateRoutes from './template.routes';

const routes = (app: Express) => {
  // user routes
  app.use('/users', userRoutes);

  // template routes
  app.use('/', templateRoutes);
};

export default routes;
