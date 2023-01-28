import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

import { subjectRepository } from '../repositories';
import { errorValidation } from './error-validation';

export const SubjectCreateMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const newSubject = subjectRepository.create(req.body);

  const errors = await validate(newSubject, {
    whitelist: true,
    forbidNonWhitelisted: true,
  });

  if (errors.length > 0) {
    return errorValidation(errors, res);
  }

  next();
};
