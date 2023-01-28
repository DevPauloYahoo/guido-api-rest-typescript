import { NextFunction, Request, Response } from 'express';

import { TErrorMiddlewareType } from './types';

export const errorMiddleware = (
  error: TErrorMiddlewareType,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  let statusCode = 0;
  let message = '';

  if (error.code === '23505') {
    statusCode = 400;
    message = 'Cadastro já existente para o dado informado';
  } else if ((statusCode = error.statusCode)) {
    message = error.message;
  } else {
    console.log(error);
    statusCode = 500;
    message = 'Internal Server Error';
  }
  return res.status(statusCode).json({ message });
};
