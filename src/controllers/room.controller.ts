import { Request, Response } from 'express';

import { Room } from '../entities';
import { BadRequestError, NotFoundError } from '../helpers';
import { roomRepository, subjectRepository } from '../repositories';

export class RoomController {
  async create(
    req: Request,
    res: Response,
  ): Promise<Response<Room> | undefined> {
    const { name, description } = req.body;

    const newRoom = roomRepository.create({
      name,
      description,
    });

    await roomRepository.save(newRoom);
    return res.status(201).json(newRoom);
  }

  async addSubject(
    req: Request,
    res: Response,
  ): Promise<Response<Room> | undefined> {
    const { roomId, subjectId } = req.body;

    if (!roomId) {
      throw new BadRequestError('ID da Sala é obrigatório');
    }

    const room = await roomRepository.findOne({
      where: { id: roomId },
      relations: { subjects: true },
    });

    if (!room) {
      throw new NotFoundError(`Sala não encontrada para o ID ${roomId}`);
    }

    if (!subjectId) {
      throw new BadRequestError('ID do Assunto é obrigatório');
    }

    const subject = await subjectRepository.findOneBy({ id: subjectId });

    if (!subject) {
      throw new NotFoundError(
        `Disciplina não encontrada para o ID ${subjectId}`,
      );
    }

    if (room?.subjects.find((s) => s.id === subjectId) && room?.id === roomId) {
      throw new BadRequestError(
        `A disciplina ${subject.name} já pertence a sala ${room?.name}`,
      );
    }

    room.subjects.push(subject);

    const result = await roomRepository.save(room);

    return res.status(200).json({
      result,
      // message: `${subject.name} adicionada com sucesso à ${room.name}`,
    });
  }

  async findById(
    req: Request,
    res: Response,
  ): Promise<Response<Room> | undefined> {
    const { roomId } = req.params;

    const roomFound = await roomRepository.findOne({
      where: { id: roomId },
      relations: { subjects: true, videos: true },
      select: {
        id: true,
        name: true,
        subjects: true,
        videos: true,
      },
    });

    if (!roomFound) {
      throw new NotFoundError(`Sala não encontrada para o ID ${roomId}`);
    }

    return res.status(200).json(roomFound);
  }
}
