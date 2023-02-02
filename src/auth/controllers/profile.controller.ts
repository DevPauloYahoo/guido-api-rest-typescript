import { Request, Response } from 'express';
import { z } from 'zod';

import { Profile } from '../../entities';
import { ProfileRepository } from '../repositories';
import { roleProfileSchema } from '../schemas';

export class ProfileController {
  async create(req: Request, res: Response) {
    roleProfileSchema.parse(req.body);
    const { name, description } = req.body;

    type TProfile = z.infer<typeof roleProfileSchema>;
    const newProfile: TProfile = { name, description };

    const result = await ProfileRepository.createQueryBuilder()
      .insert()
      .into(Profile)
      .values(newProfile)
      .execute();

    return res
      .status(200)
      .json(`Perfil com ID: ${result.raw[0].id} criado com sucesso`);
  }
}
