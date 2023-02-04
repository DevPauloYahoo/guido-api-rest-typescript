import { compareSync } from 'bcrypt';
import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';

import { UserEntity } from '../../entities';
import { BadRequestError } from '../../helpers';
import { UserRepository } from '../../repositories';
import { signInSchema } from '../schemas';

type Ttoken = {
  access_token: string;
};

export class SigninController {
  async signIn(req: Request, res: Response): Promise<Response<UserEntity>> {
    signInSchema.parse(req.body);

    const { email, password } = req.body;

    const userFound = await UserRepository.createQueryBuilder('user')
      .select([
        'user.id',
        'user.email',
        'user.password',
        'profile.name',
        'role.name',
      ])
      .leftJoin('user.profiles', 'profile')
      .leftJoin('profile.roles', 'role')
      .where('user.email = :email', { email })
      .getOne();

    if (!userFound) {
      throw new BadRequestError('Usuário ou senha inválido');
    }

    const isValidPass = compareSync(password, userFound.password);

    if (!isValidPass) {
      throw new BadRequestError('Usuário ou senha inválido');
    }

    const profilesName = userFound.profiles.map((value) => value.name);

    const rolesName = userFound.profiles.map((value) =>
      value.roles.map((value) => value.name),
    );

    const token: Ttoken = {
      access_token: sign(
        {
          email: userFound.email,
          profiles: profilesName,
          roles: rolesName,
        },
        process.env.JWT_SECRET ?? '',
        {
          subject: userFound.id,
          expiresIn: '15m',
        },
      ),
    };

    res.header('x-access-token', token.access_token);

    return res.status(200).json({ message: 'Login com sucesso' });
  }
}
