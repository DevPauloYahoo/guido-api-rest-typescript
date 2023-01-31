import { NextFunction, Request, Response } from 'express';

import { roomRepository } from '../repositories';

export const VideoCreateMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { roomId } = req.params;
  const room = await roomRepository.findOneBy({ id: roomId });

  if (!room) {
    return res
      .status(404)
      .json({ roomId: `Sala com ID ${roomId} não encontrada` });
  }

  req.room = room;

  next();
};
