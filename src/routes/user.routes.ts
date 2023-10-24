import { Router } from 'express';
import * as userControllers from '../controllers/user.controllers';
import * as userValidators from '../validators/user.validators';

const router = Router();

router
  .post('/register', userValidators.validateRegisterUser, userControllers.registerUser)
  .post('/login', userValidators.validateLoginUser, userControllers.loginUser);

export default router;
