import { NextFunction, Request, Response } from 'express';

export const AuthValidationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  next();
};
