import { Request, Response } from 'express';

import { Video } from '../entities';
import { videoRepository } from '../repositories';

export class VideoController {
  async create(req: Request, res: Response) {
    const { room } = req;

    const newVideo = await videoRepository
      .createQueryBuilder()
      .insert()
      .into(Video)
      .values({ ...req.body, room })
      .execute();

    return res.status(201).json({
      message: `Vídeo com ID: ${newVideo.raw[0].id} adicionado com sucesso`,
    });
  }
}
