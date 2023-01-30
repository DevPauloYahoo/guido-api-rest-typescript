import { hashSync } from 'bcrypt';
import { Request, Response } from 'express';

import { UserEntity } from '../entities/user.entity';
import { UserRepository } from '../repositories';

export class SignupController {
  async signUp(req: Request, res: Response): Promise<Response<UserEntity>> {
    req.body.password = hashSync(req.body.password, 10);

    const newUser = await UserRepository.createQueryBuilder()
      .insert()
      .into(UserEntity)
      .values(req.body)
      .execute();

    return res.status(201).json({
      message: `Usuário com ID: ${newUser.raw[0].id} e 
                ROLE: ${newUser.raw[0].roles} adicionado com sucesso`,
    });
  }
}
