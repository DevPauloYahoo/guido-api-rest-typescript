import { Request, Response } from 'express';

import { Room } from '../entities';
import { roomRepository, subjectRepository } from '../repositories';

export class RoomController {
  async create(
    req: Request,
    res: Response,
  ): Promise<Response<Room> | undefined> {
    const { name, description } = req.body;

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

      const room = await roomRepository.findOne({
        where: { id: roomId },
        relations: { subjects: true },
      });

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

      if (
        room?.subjects.find((s) => s.id === subjectId) &&
        room?.id === roomId
      ) {
        return res.status(400).json({
          message: `A disciplina ${subject.name} já pertence a sala ${room?.name}`,
        });
      }

      room.subjects.push(subject);

      const result = await roomRepository.save(room);

      return res.status(200).json({
        result,
        // message: `${subject.name} adicionada com sucesso à ${room.name}`,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro interno no servidor' });
    }
  }
}
