import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

import { roomRepository } from '../repositories';
import { TConstraints } from './types';

export const RoomCreateMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const newRoom = roomRepository.create({
    name: req.body.name,
    description: req.body.description,
  });

  const errors = await validate(newRoom, {
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
