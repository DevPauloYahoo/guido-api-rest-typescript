import { Request, Response } from 'express';

import { Profile } from '../../entities';
import { BadRequestError, NotFoundError } from '../../helpers';
import { ProfileRepository, RoleRepository } from '../repositories';
import { addRoleToProfileSchema, createProfileSchema } from '../schemas';

export class ProfileController {
  async create(req: Request, res: Response) {
    createProfileSchema.parse(req.body);
    const { name, description, roles } = req.body;

    if (roles) {
      const ids: string[] = [];

      for (const role of roles) {
        ids.push(role.id);
      }

      if (hasDuplicates(ids)) {
        throw new BadRequestError(
          'Um Perfil não pode conter permissões duplicadas',
        );
      }

      for (const rolesIds of roles) {
        const roleFound = await RoleRepository.findOne({
          where: { id: rolesIds.id },
          select: {
            id: true,
          },
        });

        if (!roleFound) {
          throw new NotFoundError(
            `Permissão com ID: ${rolesIds.id} não encontrada`,
          );
        }
      }
    }

    const newProfile = await ProfileRepository.createQueryBuilder()
      .insert()
      .into(Profile)
      .values({ name, description })
      .execute();

    if (roles) {
      await ProfileRepository.createQueryBuilder()
        .relation(Profile, 'roles')
        .of(newProfile.identifiers)
        .add(roles);
    }
    return res.status(201).json({
      message: `Perfil ${name} adicionado com sucesso`,
    });
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

  async listAll(req: Request, res: Response) {
    const profiles = await ProfileRepository.createQueryBuilder('profile')
      .select(['profile.id', 'profile.name', 'role.id', 'role.name'])
      .leftJoin('profile.roles', 'role')
      .getMany();

    return res.status(200).json(profiles);
  }
}

// funções auxiliares
function hasDuplicates(array: any) {
  return new Set(array).size !== array.length;
}
