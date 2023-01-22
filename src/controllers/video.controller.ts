import { Request, Response } from 'express';

import { videoRepository } from '../repositories';

export class VideoController {
  async create(req: Request, res: Response) {
    const { title, url } = req.body;
    const { room } = req;
    if (room) {
      const newVideo = videoRepository.create({
        title,
        url,
        room,
      });
      await videoRepository.save(newVideo);
      return res.status(201).json(newVideo);
    }
  }
}
