import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

import { UserRepository } from '../repositories';
import { errorValidation } from './error-validation';

export const SigninMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;

  const user = UserRepository.create({
    email,
    password,
  });

  const errors = await validate(user, {
    whitelist: true,
    forbidNonWhitelisted: true,
  });

  if (errors.length > 0) {
    return errorValidation(errors, res);
  }

  next();
};
