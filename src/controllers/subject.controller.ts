import { Request, Response } from 'express';

import { subjectRepository } from '../repositories/subjetc.repository';

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
}
