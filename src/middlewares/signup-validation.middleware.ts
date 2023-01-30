import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

import { UserRepository } from '../repositories';
import { errorValidation } from './error-validation';

export const SignupMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const newUser = UserRepository.create(req.body);

  const errors = await validate(newUser, {
    whitelist: true,
    // forbidNonWhitelisted: true,
  });

  if (errors.length > 0) {
    return errorValidation(errors, res);
  }

  next();
};
