import { Router } from 'express';

import { resolver } from '../helpers';
import { SigninController, SignupController } from './controllers';

const authRoutes = Router();

authRoutes
  .post('/users/signup', [], resolver(new SignupController().signUp))
  .post('/users/signin', [], resolver(new SigninController().signIn));

export default authRoutes;
