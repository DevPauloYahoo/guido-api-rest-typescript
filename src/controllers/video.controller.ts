import { Request, Response } from 'express';

import { Video } from '../entities';
import { NotFoundError } from '../helpers';
import { roomRepository, videoRepository } from '../repositories';
import { videoSchema } from '../schemas/video.schema';

export class VideoController {
  async create(req: Request, res: Response): Promise<Response<string>> {
    videoSchema.parse(req.body);

    const { roomId } = req.params;
    const room = await roomRepository.findOneBy({ id: roomId });

    if (!room) {
      throw new NotFoundError(`Sala com ID ${roomId} não encontrada`);
    }

    await videoRepository
      .createQueryBuilder()
      .insert()
      .into(Video)
      .values({ ...req.body, room })
      .execute();

    return res.status(201).json({
      message: `Vídeo ${req.body.title.toUpperCase()} adicionado com sucesso`,
    });
  }
}
