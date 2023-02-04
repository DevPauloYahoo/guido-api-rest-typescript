import { Request, Response } from 'express';
import {
  paginate,
  PaginationAwareObject,
} from 'typeorm-pagination/dist/helpers/pagination';

import { Room } from '../entities';
import { NotFoundError } from '../helpers';
import { roomRepository, subjectRepository } from '../repositories';
import { addSubjectSchema } from '../schemas/add-subject.schema';
import { findByIdRoomSchema, roomSchema } from '../schemas/room.schema';

export class RoomController {
  async create(
    req: Request,
    res: Response,
  ): Promise<Response<Room> | undefined> {
    roomSchema.parse(req.body);

    await roomRepository
      .createQueryBuilder()
      .insert()
      .into(Room)
      .values(req.body)
      .execute();

    return res.status(201).json({
      message: `Sala ${req.body.name.toUpperCase()} adicionada com sucesso`,
    });
  }

  async addSubject(
    req: Request,
    res: Response,
  ): Promise<Response<Room> | undefined> {
    addSubjectSchema.parse(req.body);

    const { roomId, subjectId } = req.body;

    const room = await roomRepository.findOne({
      where: { id: roomId },
      select: { id: true, name: true },
    });

    if (!room) {
      throw new NotFoundError(`Sala não encontrada para o ID ${roomId}`);
    }

    const subject = await subjectRepository.findOne({
      where: { id: subjectId },
      select: { id: true, name: true },
    });

    if (!subject) {
      throw new NotFoundError(
        `Disciplina não encontrada para o ID ${subjectId}`,
      );
    }

    await roomRepository
      .createQueryBuilder()
      .relation(Room, 'subjects')
      .of(roomId)
      .add(subjectId);

    return res.status(201).json({
      message: `${subject.name} adicionada com sucesso à ${room.name}`,
    });
  }

  async findById(
    req: Request,
    res: Response,
  ): Promise<Response<Room> | undefined> {
    findByIdRoomSchema.parse(req.params);

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

  async findAllPagination(
    req: Request,
    res: Response,
  ): Promise<Response<PaginationAwareObject>> {
    const { page = 1, limit = 10 } = req.query;

    const rooms = roomRepository
      .createQueryBuilder('room')
      .select([
        'room.id',
        'room.name',
        'sub.id',
        'sub.name',
        'video.id',
        'video.title',
        'video.url',
      ])
      .leftJoin('room.subjects', 'sub')
      .leftJoin('room.videos', 'video');

    const result = await paginate(rooms as any, Number(page), Number(limit));

    return res.status(200).json(result);
  }
}
