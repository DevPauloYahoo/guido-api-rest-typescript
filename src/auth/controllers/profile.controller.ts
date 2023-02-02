import { Request, Response } from 'express';

import { Profile } from '../../entities';
import { NotFoundError } from '../../helpers';
import { ProfileRepository, RoleRepository } from '../repositories';
import { addRoleToProfileSchema, createProfileSchema } from '../schemas';

export class ProfileController {
  async create(req: Request, res: Response) {
    createProfileSchema.parse(req.body);
    const { name, description, roles } = req.body;

    console.log('ROLES ' + JSON.stringify(roles));

    const newProfile = await ProfileRepository.createQueryBuilder()
      .insert()
      .into(Profile)
      .values({ name, description })
      .execute();

    for (const idsRole of roles) {
      console.log(idsRole);
      await ProfileRepository.createQueryBuilder()
        .relation(Profile, 'roles')
        .of(newProfile.identifiers)
        .add(idsRole);
    }

    return res.status(201).json({ message: 'Perfil adicionado com sucesso' });
  }

  async addRoleToProfile(req: Request, res: Response) {
    addRoleToProfileSchema.parse(req.body);
    const { profile_id, role_id } = req.body;

    const profile = await ProfileRepository.findOneBy({ id: profile_id });

    if (!profile) {
      throw new NotFoundError(`Perfil não encontrado para o ID: ${profile_id}`);
    }

    const role = await RoleRepository.findOneBy({ id: role_id });

    if (!role) {
      throw new NotFoundError(`Permissão não encontrada para o ID: ${role_id}`);
    }

    await ProfileRepository.createQueryBuilder()
      .relation(Profile, 'roles')
      .of(profile_id)
      .add(role_id);

    return res.status(201).json({
      message: `Permissão: ${role.name} adicionada ao Perfil: ${profile.name}`,
    });
  }
}
