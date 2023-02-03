import { hashSync } from 'bcrypt';
import { Request, Response } from 'express';

import { UserEntity } from '../../entities';
import { UserRepository } from '../../repositories';
import { signUpSchema } from '../schemas';

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
}
