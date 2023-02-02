import { Request, Response } from 'express';
import { z } from 'zod';

import { Role } from '../../entities';
import { RoleRepository } from '../repositories';
import { roleSchema } from '../schemas';

export class RoleController {
  async create(req: Request, res: Response) {
    roleSchema.parse(req.body);
    const { name, description } = req.body;

    type TRole = z.infer<typeof roleSchema>;
    const newRole: TRole = { name, description };

    const result = await RoleRepository.createQueryBuilder()
      .insert()
      .into(Role)
      .values(newRole)
      .execute();

    return res
      .status(200)
      .json(`Permissão com ID: ${result.raw[0].id} criado com sucesso`);
  }
}
