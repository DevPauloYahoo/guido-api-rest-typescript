import { Request, Response } from 'express';

import { Video } from '../entities';
import { roomRepository, videoRepository } from '../repositories';
import { videoSchema } from '../schemas/video.schema';

export class VideoController {
  async create(req: Request, res: Response): Promise<Response<string>> {
    videoSchema.parse(req.body);

    const { roomId } = req.params;
    const room = await roomRepository.findOneBy({ id: roomId });

    if (!room) {
      return res
        .status(404)
        .json({ roomId: `Sala com ID ${roomId} não encontrada` });
    }

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
