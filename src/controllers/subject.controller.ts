import { Request, Response } from 'express';

import { Subject } from '../entities';
import { subjectRepository } from '../repositories';
import { subjectSchema } from '../schemas/subject.schema';

export class SubjectController {
  async create(req: Request, res: Response): Promise<Response<Subject>> {
    subjectSchema.parse(req.body);

    const newSubject = subjectRepository.create(req.body);

    await subjectRepository.save(newSubject);
    return res.status(201).json(newSubject);
  }

  async findAll(req: Request, res: Response) {
    const subjects = await subjectRepository.find({
      relations: {
        rooms: true,
      },
    });
    return res.status(200).json(subjects);
  }
}
