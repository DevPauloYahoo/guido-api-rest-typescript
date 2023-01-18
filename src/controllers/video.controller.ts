import { Request, Response } from 'express';

import { roomRepository } from '../repositories/room.repository';
import { videoRepository } from '../repositories/video.repository';

export class VideoController {
  async create(req: Request, res: Response) {
    const { title, url } = req.body;
    const { roomId } = req.params;

    const room = await roomRepository.findOneBy({ id: roomId });
    if (!room) {
      return res.status(404).json({ message: 'Sala não encontrada' });
    }

    if (!title) {
      return res.status(400).json({ message: 'Título é obrigatório' });
    }
    if (!url) {
      return res.status(400).json({ message: 'Url é obrigatório' });
    }

    try {
      const newVideo = videoRepository.create({
        title,
        url,
        room,
      });

      await videoRepository.save(newVideo);
      return res.status(201).json(newVideo);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro interno no servidor' });
    }
  }
}
