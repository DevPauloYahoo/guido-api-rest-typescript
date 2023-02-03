import { Request, Response } from 'express';
import { z } from 'zod';

import { Role } from '../../entities';
import { RoleRepository } from '../repositories';
import { createRoleSchema } from '../schemas';

export class RoleController {
  async create(req: Request, res: Response) {
    createRoleSchema.parse(req.body);
    const { name, description } = req.body;

    type TRole = z.infer<typeof createRoleSchema>;
    const newRole: TRole = { name, description };

    await RoleRepository.createQueryBuilder()
      .insert()
      .into(Role)
      .values(newRole)
      .execute();

    return res
      .status(200)
      .json(`Permissão ${name.toUpperCase()} criado com sucesso`);
  }

  async listAll(req: Request, res: Response) {
    const roles = await RoleRepository.createQueryBuilder().getMany();

    res.status(200).json(roles);
  }
}
