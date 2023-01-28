import { ValidationError } from 'class-validator';
import { Response } from 'express';

import { BadRequestErrorValidation } from '../helpers';
import { TConstraints } from './types';

export const errorValidation = (errors: ValidationError[], res: Response) => {
  let constraints: TConstraints = undefined;
  errors.forEach((err) => (constraints = err.constraints));
  return new BadRequestErrorValidation(constraints, res);
};
