import { Request, Response } from 'express';

import { Subject } from '../entities/subject.entity';
import { roomRepository } from '../repositories/room.repository';
import { subjectRepository } from '../repositories/subject.repository';

export class SubjectController {
  async create(req: Request, res: Response) {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Nome é obrigatório' });
    }
    try {
      const newSubject = subjectRepository.create({
        name,
      });

      await subjectRepository.save(newSubject);
      return res.status(201).json(newSubject);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Erro interno no servidor' });
    }
  }

  async addRoom(
    req: Request,
    res: Response,
  ): Promise<Response<Subject> | undefined> {
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

      const upRoom = roomRepository.create({
        ...room,
        subjects: [subject],
      });

      await roomRepository.save(upRoom);

      return res.status(200).json({
        message: `${room.name} adicionada com sucesso à ${subject.name}`,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Erro interno no servidor' });
    }
  }
}
