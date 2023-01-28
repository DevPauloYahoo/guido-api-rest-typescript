import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

import { roomRepository, videoRepository } from '../repositories';
import { errorValidation } from './error-validation';

export const VideoCreateMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const newVideo = videoRepository.create(req.body);

  const { roomId } = req.params;
  const room = await roomRepository.findOneBy({ id: roomId });

  if (!room) {
    return res
      .status(404)
      .json({ roomId: `Sala com ID ${roomId} não encontrada` });
  }

  const errors = await validate(newVideo, {
    whitelist: true,
    forbidNonWhitelisted: true,
  });

  if (errors.length > 0) {
    return errorValidation(errors, res);
  }

  req.room = room;

  next();
};
