import { Request, Response } from 'express';

import { subjectRepository } from '../repositories';

export class SubjectController {
  async create(req: Request, res: Response) {
    const { name } = req.body;

    const newSubject = subjectRepository.create({
      name,
    });

    await subjectRepository.save(newSubject);
    return res.status(201).json(newSubject);
  }
}
