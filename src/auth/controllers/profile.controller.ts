import { Request, Response } from 'express';

import { Profile } from '../../entities';
import { NotFoundError } from '../../helpers';
import { ProfileRepository, RoleRepository } from '../repositories';
import { profileSchema } from '../schemas';

export class ProfileController {
  async create(req: Request, res: Response) {
    profileSchema.parse(req.body);
    const { name, description, role_id } = req.body;

    const newProfile = await ProfileRepository.createQueryBuilder()
      .insert()
      .into(Profile)
      .values({
        name,
        description,
      })
      .execute();

    const role = await RoleRepository.findOneBy({ id: role_id });

    if (!role) {
      throw new NotFoundError(`Permissão não encontrada para o ID: ${role_id}`);
    }

    await ProfileRepository.createQueryBuilder()
      .relation(Profile, 'roles')
      .of(newProfile.raw[0].id)
      .add(role_id);

    return res.json(
      `Perfil com ID: ${newProfile.raw[0].id} criado com sucesso`,
    );
  }
}
