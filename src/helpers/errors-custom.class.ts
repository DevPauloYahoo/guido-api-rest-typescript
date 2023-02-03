import { Response } from 'express';

import { ResErroZod, TConstraints } from '../middlewares';
import { ApiErrors } from './api-errors.class';

export class BadRequestError extends ApiErrors {
  constructor(message: string) {
    super(message, 400);
  }
}

export class NotFoundError extends ApiErrors {
  constructor(message: string) {
    super(message, 404);
  }
}

export class UnauthorizedError extends ApiErrors {
  constructor(message: string) {
    super(message, 401);
  }
}

export class BadRequestErrorValidation {
  constructor(data: TConstraints, res: Response) {
    return res.status(400).json(data);
  }
}

export class BadRequestValidationZod {
  constructor(data: ResErroZod[], res: Response) {
    return res.status(400).json(data);
  }
}
