import { ValidationError } from 'class-validator';
import { Response } from 'express';
import { ZodIssue } from 'zod';

import { ResErroZod, TConstraints } from '../middlewares';
import { BadRequestErrorValidation, BadRequestValidationZod } from './index';

export const errorValidation = (errors: ValidationError[], res: Response) => {
  let constraints: TConstraints = undefined;
  errors.forEach((err) => (constraints = err.constraints));
  return new BadRequestErrorValidation(constraints, res);
};

export const errorZodValidation = (errorsZod: ZodIssue[], res: Response) => {
  const resZod: ResErroZod[] = [];
  errorsZod.forEach((error) => {
    resZod.push({ message: error.message, path: error.path });
  });

  return new BadRequestValidationZod(resZod, res);
};
