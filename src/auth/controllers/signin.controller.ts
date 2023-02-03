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

    const userFound = await UserRepository.findOne({
      where: { email },
      select: {
        email: true,
        password: true,
      },
    });

    if (!userFound) {
      throw new BadRequestError('Usuário ou senha inválido');
    }

    const isValidPass = compareSync(password, userFound.password);

    if (!isValidPass) {
      throw new BadRequestError('Usuário ou senha inválido');
    }

    const token: Ttoken = {
      access_token: sign(
        {
          id: userFound.id,
          email: userFound.email,
          profiles: userFound.profiles,
        },
        process.env.JWT_SECRET ?? '',
        {
          expiresIn: '15m',
        },
      ),
    };

    res.header('x-access-token', token.access_token);

    return res.status(200).json({ message: 'Login com sucesso' });
  }
}
