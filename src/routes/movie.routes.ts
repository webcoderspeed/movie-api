import { Router } from 'express';
import * as movieValidators from '../validators/movie.validators';
import * as movieControllers from '../controllers/movie.controllers';

const router = Router();

router.post('/', movieValidators.validateCreateMovie, movieControllers.createMovie);

export default router;
