import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

import { roomRepository } from '../repositories';
import { errorValidation } from './error-validation';

export const RoomCreateMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const newRoom = roomRepository.create(req.body);

  const errors = await validate(newRoom, {
    whitelist: true,
  });

  if (errors.length > 0) {
    return errorValidation(errors, res);
  }

  next();
};
