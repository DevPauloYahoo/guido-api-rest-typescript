import { Router } from 'express';

import { SigninController, SignupController } from '../controllers';
import { resolver } from '../helpers';
import { SignupMiddleware } from '../middlewares';

const authRoutes = Router();

authRoutes
  .post(
    '/users/signup',
    [SignupMiddleware],
    resolver(new SignupController().signUp),
  )
  .post('/users/signin', [], resolver(new SigninController().signIn));

export default authRoutes;
