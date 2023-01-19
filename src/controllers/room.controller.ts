import { Request, Response } from 'express';

import { Room } from '../entities/room.entity';
import { roomRepository } from '../repositories/room.repository';
import { subjectRepository } from '../repositories/subject.repository';

export class RoomController {
  async create(
    req: Request,
    res: Response,
  ): Promise<Response<Room> | undefined> {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Nome é obrigatório' });
    }

    try {
      const newRoom = roomRepository.create({
        name,
        description,
      });

      await roomRepository.save(newRoom);
      return res.status(201).json(newRoom);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro interno no servidor' });
    }
  }

  async addSubject(
    req: Request,
    res: Response,
  ): Promise<Response<Room> | undefined> {
    const { roomId, subjectId } = req.body;

    try {
      if (!roomId) {
        return res.status(400).json({ message: 'ID da Sala é obrigatório' });
      }

      const room = await roomRepository.findOneBy({ id: roomId });
      if (!room) {
        return res.status(400).json({ message: 'Sala não encontrada' });
      }

      if (!subjectId) {
        return res.status(400).json({ message: 'ID do Assunto é obrigatório' });
      }

      const subject = await subjectRepository.findOneBy({ id: subjectId });
      if (!subject) {
        return res.status(400).json({ message: 'Matéria não encontrada' });
      }

      subject.rooms = [room];

      await subjectRepository.save(subject);

      return res.status(200).json({
        message: `${subject.name} adicionada com sucesso à ${room.name}`,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro interno no servidor' });
    }
  }
}
