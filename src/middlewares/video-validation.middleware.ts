import { validate } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

import { roomRepository, videoRepository } from '../repositories';
import { TConstraints } from './types';

export const VideoCreateMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const newVideo = videoRepository.create({
    title: req.body.title,
    url: req.body.url,
  });

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
    let constraints: TConstraints = undefined;
    errors.forEach((err) => (constraints = err.constraints));
    return res.status(400).json(constraints);
  }

  req.room = room;

  next();
};
