import { NextFunction, Request, Response } from 'express';
import { TokenExpiredError, verify } from 'jsonwebtoken';

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

  const token = authorization.substring(8);

  try {
    const { email, roles } = verify(
      token,
      process.env.JWT_SECRET ?? '',
    ) as payload;
    console.log(email, roles);
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      return res.status(400).json({ message: 'Token expirado. Acesso negado' });
    } else {
      return res.status(400).json({ message: 'Token inválido. Acesso negado' });
    }
  }

  next();
};
