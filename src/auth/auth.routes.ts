import { Router } from 'express';

import { resolver } from '../helpers';
import {
  ProfileController,
  SigninController,
  SignupController,
} from './controllers';
import { RoleController } from './controllers/role.controller';

const authRoutes = Router();

authRoutes
  .post('/users/signup', resolver(new SignupController().signUp))
  .post('/users/add-profile', resolver(new SignupController().addProfileToUser))
  .post('/users/signin', resolver(new SigninController().signIn))
  .get('/users', resolver(new SignupController().listAll))

  .post('/profiles', resolver(new ProfileController().create))
  .get('/profiles', resolver(new ProfileController().listAll))
  .post(
    '/profiles/add-roles',
    resolver(new ProfileController().addRoleToProfile),
  )
  .post('/roles', resolver(new RoleController().create))
  .get('/roles', resolver(new RoleController().listAll));

export default authRoutes;
