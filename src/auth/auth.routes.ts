import { Router } from 'express';

import { resolver } from '../helpers';
import {
  ProfileController,
  SigninController,
  SignupController,
} from './controllers';
import { RoleController } from './controllers/role.controller';
import { isProfile } from './middlewares';

const authRoutes = Router();

authRoutes
  // cadastra novo usuário
  .post('/users/signup', resolver(new SignupController().signUp))
  // rota para login
  .post('/users/signin', resolver(new SigninController().signIn))

  // cadastra novos perfis
  .post(
    '/profiles',
    [isProfile(['ADMIN'])],
    resolver(new ProfileController().create),
  )
  // adiciona perfis aos usuários
  .post(
    '/users/add-profile',
    [isProfile(['ADMIN'])],
    resolver(new SignupController().addProfileToUser),
  )

  // cadastra novas permissões
  .post('/roles', [isProfile(['ADMIN'])], resolver(new RoleController().create))
  // adiciona permissões aos perfis
  .post(
    '/profiles/add-roles',
    [isProfile(['ADMIN'])],
    resolver(new ProfileController().addRoleToProfile),
  )

  // lista todos os usuários cadastrados
  .get('/users', resolver(new SignupController().listAll))
  // lista todos os perfis cadastrados
  .get('/profiles', resolver(new ProfileController().listAll))
  // lista todas as permissões cadastradas
  .get('/roles', resolver(new RoleController().listAll));

export default authRoutes;
