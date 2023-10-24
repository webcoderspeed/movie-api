import { Express } from 'express';
import userRoutes from './user.routes';
import templateRoutes from './template.routes';
import movieRoutes from './movie.routes';

const routes = (app: Express) => {
  // user routes
  app.use('/users', userRoutes);

  // template routes
  app.use('/', templateRoutes);

  // movie routes
  app.use('/movies', movieRoutes);
};

export default routes;
