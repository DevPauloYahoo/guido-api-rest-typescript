import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

import { subjectRepository } from '../repositories';
import { TConstraints } from './types';

export const SubjectCreateMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const newSubject = subjectRepository.create({
    name: req.body.name,
  });

  const errors = await validate(newSubject, {
    whitelist: true,
    forbidNonWhitelisted: true,
  });

  if (errors.length > 0) {
    let constraints: TConstraints = undefined;
    errors.forEach((err) => (constraints = err.constraints));
    return res.status(400).json(constraints);
  }
  next();
};
