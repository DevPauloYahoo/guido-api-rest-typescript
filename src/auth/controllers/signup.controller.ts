import { hashSync } from 'bcrypt';
import { Request, Response } from 'express';

import { UserEntity } from '../../entities';
import { NotFoundError } from '../../helpers';
import { UserRepository } from '../../repositories';
import { ProfileRepository } from '../repositories';
import { addProfileToUserSchema, signUpSchema } from '../schemas';

export class SignupController {
  async signUp(req: Request, res: Response): Promise<Response<UserEntity>> {
    signUpSchema.parse(req.body);

    req.body.password = hashSync(req.body.password, 10);

    await UserRepository.createQueryBuilder()
      .insert()
      .into(UserEntity)
      .values(req.body)
      .execute();

    return res.status(201).json({
      message: `Usuário ${req.body.email.toUpperCase()} adicionado com sucesso`,
    });
  }

  async addProfileToUser(req: Request, res: Response) {
    addProfileToUserSchema.parse(req.body);

    const { user_id, profile_id } = req.body;

    const userFound = await UserRepository.createQueryBuilder('user')
      .select(['user.name'])
      .where('user.id = :user_id', { user_id })
      .getOne();

    if (!userFound) {
      throw new NotFoundError(`Usuário com ID: ${user_id} não encontrado`);
    }

    const profileFound = await ProfileRepository.findOne({
      where: {
        id: profile_id,
      },
      select: {
        name: true,
      },
    });

    if (!profileFound) {
      throw new NotFoundError(`Perfil com ID: ${user_id} não encontrado`);
    }

    await UserRepository.createQueryBuilder()
      .relation(UserEntity, 'profiles')
      .of(user_id)
      .add(profile_id);

    return res
      .status(200)
      .json(
        `Perfil: ${
          profileFound.name
        } adicionado ao Usuário: ${userFound.name.toUpperCase()}`,
      );
  }

  async listAll(req: Request, res: Response) {
    const users = await UserRepository.createQueryBuilder('user')
      .select(['user.id', 'user.name', 'profile.name', 'role.name'])
      .leftJoin('user.profiles', 'profile')
      .leftJoin('profile.roles', 'role')
      .getMany();

    res.status(200).json(users);
  }
}
