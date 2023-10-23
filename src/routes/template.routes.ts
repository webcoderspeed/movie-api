import { Router } from 'express';
import * as templateControllers from '../controllers/template.controllers';

const router = Router();

router
  .get('/register', templateControllers.registerPageUI)
  .get('/login', templateControllers.loginPageUI)
  .get('/', templateControllers.dashboardPageUI);

export default router;
