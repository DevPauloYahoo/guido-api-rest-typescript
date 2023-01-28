import { Request, Response } from 'express';
import {
  paginate,
  PaginationAwareObject,
} from 'typeorm-pagination/dist/helpers/pagination';

import { Room } from '../entities';
import { BadRequestError, NotFoundError } from '../helpers';
import { roomRepository, subjectRepository } from '../repositories';

export class RoomController {
  async create(
    req: Request,
    res: Response,
  ): Promise<Response<Room> | undefined> {
    // const { name, description } = req.body;

    const newRoom = await roomRepository
      .createQueryBuilder()
      .insert()
      .into(Room)
      .values(req.body)
      .execute();

    // const newRoom = roomRepository.create({
    //   name,
    //   description,
    // });

    // await roomRepository.save(newRoom);
    return res.status(201).json({
      message: `Sala com ID: ${newRoom.identifiers} adicionada com sucesso`,
    });
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
      select: { id: true, name: true },
    });

    if (!room) {
      throw new NotFoundError(`Sala não encontrada para o ID ${roomId}`);
    }

    if (!subjectId) {
      throw new BadRequestError('ID da Disciplina é obrigatório');
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

    // if (room?.subjects.find((s) => s.id === subjectId) && room?.id === roomId) {
    //   throw new BadRequestError(
    //     `A disciplina ${subject.name} já pertence a sala ${room?.name}`,
    //   );
    // }

    await roomRepository
      .createQueryBuilder()
      .relation(Room, 'subjects')
      .of(roomId)
      .add(subjectId);

    // room.subjects.push(subject);

    // const result = await roomRepository.save(room);

    return res.status(201).json({
      // result,
      message: `${subject.name} adicionada com sucesso à ${room.name}`,
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

  async findAllPagination(
    req: Request,
    res: Response,
  ): Promise<Response<PaginationAwareObject>> {
    const { page = 1, limit = 10 } = req.query;

    const rooms = roomRepository
      .createQueryBuilder('room')
      .select(['room.id', 'room.name', 'sub.id', 'sub.name'])
      .leftJoin('room.subjects', 'sub', 'sub.id = room_sub.subject_id');

    const result = await paginate(rooms as any, Number(page), Number(limit));

    return res.status(200).json(result);
  }
}
