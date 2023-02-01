import { NextFunction, Request, Response } from 'express';
import { JsonWebTokenError, TokenExpiredError, verify } from 'jsonwebtoken';

type payload = {
  email: string;
  roles: string[];
};

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Acesso não autorizado' });
  }

  const token = authorization.substring(7).trim();

  verify(token, process.env.JWT_SECRET as string, (error, decoded) => {
    if (error instanceof TokenExpiredError) {
      return res.status(403).json({ message: 'Token expirado. Acesso negado' });
    }

    if (error instanceof JsonWebTokenError) {
      return res.status(403).json({ message: 'Token inválido. Acesso negado' });
    }

    const { email } = decoded as payload;

    req.user = {
      email,
    };

    console.log('USER ' + req.user.email);
  });

  next();
};
