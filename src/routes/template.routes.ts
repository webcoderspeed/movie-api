import { Router } from 'express';
import * as templateControllers from '../controllers/template.controllers';

const router = Router();

router
  .get('/', templateControllers.dashboardPageUI)
  .get('/register', templateControllers.registerPageUI)
  .get('/login', templateControllers.loginPageUI)
  .get('/create-movie', templateControllers.createMoviePageUI);

export default router;
