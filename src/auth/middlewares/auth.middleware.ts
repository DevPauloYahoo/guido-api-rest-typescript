import { NextFunction, Request, Response } from 'express';
import { JsonWebTokenError, TokenExpiredError, verify } from 'jsonwebtoken';

import { Profile } from '../../entities';

type payload = {
  id: string;
  email: string;
  profiles: Profile[];
};

export const isProfile = (userProfiles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ message: 'Acesso não autorizado' });
    }

    const token = authorization.substring(7).trim();

    verify(token, process.env.JWT_SECRET as string, (error, decoded) => {
      if (error instanceof TokenExpiredError) {
        return res
          .status(403)
          .json({ message: 'Token expirado. Acesso negado' });
      }

      if (error instanceof JsonWebTokenError) {
        return res
          .status(403)
          .json({ message: 'Token inválido. Acesso negado' });
      }

      const { id, email, profiles } = decoded as payload;

      const nameProfiles = profiles.map((p) => p.name);

      const profilesExistis = nameProfiles.some((value) =>
        userProfiles.includes(value),
      );

      if (profilesExistis) {
        req.user = {
          id,
          email,
          profiles,
        };
        next();
      } else {
        res.status(403).json({
          message: 'Usuário não tem permissão para acessar esse recurso',
        });
      }
    });
  };
};
