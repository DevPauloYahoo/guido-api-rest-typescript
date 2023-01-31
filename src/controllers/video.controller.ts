import { Request, Response } from 'express';

import { Video } from '../entities';
import { videoRepository } from '../repositories';
import { videoSchema } from '../schemas/video.schema';

export class VideoController {
  async create(req: Request, res: Response): Promise<Response<string>> {
    videoSchema.parse(req.body);

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
