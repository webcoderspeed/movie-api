import joi from 'joi';
import { Request, Response, NextFunction } from 'express';

export const validateCreateMovie = (req: Request, res: Response, next: NextFunction) => {
  try {
    const schema = joi.object({
      movieName: joi.string().required(),
      rating: joi.number().required(),
      genre: joi.string().required(),
      releaseDate: joi.string().required(),
      cast: joi.string().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) next(error);

    next();
  } catch (error) {
    next(error);
  }
};
