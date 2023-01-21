import { Request, Response } from 'express';

import { roomRepository, videoRepository } from '../repositories';

export class VideoController {
  async create(req: Request, res: Response) {
    const { title, url } = req.body;
    const { roomId } = req.params;

    try {
      const room = await roomRepository.findOneBy({ id: roomId });
      if (room) {
        const newVideo = videoRepository.create({
          title,
          url,
          room,
        });
        await videoRepository.save(newVideo);
        return res.status(201).json(newVideo);
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro interno no servidor' });
    }
  }
}
