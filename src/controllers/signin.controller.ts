import { compareSync } from 'bcrypt';
import { Request, Response } from 'express';
import { sign } from 'jsonwebtoken';

import { UserEntity } from '../entities/user.entity';
import { BadRequestError } from '../helpers';
import { UserRepository } from '../repositories';

type Ttoken = {
  access_token: string;
};

export class SigninController {
  async signIn(req: Request, res: Response): Promise<Response<UserEntity>> {
    const { email, password } = req.body;

    const userFound = await UserRepository.findOne({
      where: { email },
      select: {
        email: true,
        password: true,
        roles: true,
      },
    });

    if (!userFound) {
      throw new BadRequestError('Usuário ou senha inválido');
    }

    const isValidPass = compareSync(password, userFound.password);

    if (!isValidPass) {
      throw new BadRequestError('Usuário ou senha inválido');
    }

    console.log(userFound);

    const token: Ttoken = {
      access_token: sign(
        { email: userFound.email, roles: userFound.roles },
        process.env.JWT_SECRET ?? '',
        {
          expiresIn: '5m',
        },
      ),
    };

    res.header('x-access-token', token.access_token);

    return res.status(200).json('OK');
  }
}
