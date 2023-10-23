import joi from 'joi';
import { Request, Response, NextFunction } from 'express';

export const validateRegisterUser = (req: Request, res: Response, next: NextFunction) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) next(error);

  next();
};

export const validateLoginUser = (req: Request, res: Response, next: NextFunction) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) next(error);

  next();
};


