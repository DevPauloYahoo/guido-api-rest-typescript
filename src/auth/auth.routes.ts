import { Router } from 'express';

import { resolver } from '../helpers';
import {
  ProfileController,
  RoleController,
  SigninController,
  SignupController,
} from './controllers';
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
    [isProfile(['PRO_ADMIN'])],
    resolver(new ProfileController().create),
  )
  // adiciona perfis aos usuários
  .post(
    '/users/add-profile',
    [isProfile(['PRO_ADMIN'])],
    resolver(new SignupController().addProfileToUser),
  )

  // cadastra novas permissões
  .post(
    '/roles',
    [isProfile(['PRO_ADMIN'])],
    resolver(new RoleController().create),
  )
  // adiciona permissões aos perfis
  .post(
    '/profiles/add-roles',
    [isProfile(['PRO_ADMIN'])],
    resolver(new ProfileController().addRoleToProfile),
  )

  // lista todos os usuários cadastrados
  .get(
    '/users',
    [isProfile(['PRO_ADMIN', 'PRO_USER', 'PRO_CONVIDADO'])],
    resolver(new SignupController().listAll),
  )
  // lista todos os perfis cadastrados
  .get(
    '/profiles',
    [isProfile(['PRO_ADMIN', 'PRO_USER', 'PRO_CONVIDADO'])],
    resolver(new ProfileController().listAll),
  )
  // lista todas as permissões cadastradas
  .get(
    '/roles',
    [isProfile(['PRO_ADMIN', 'PRO_USER', 'PRO_CONVIDADO'])],
    resolver(new RoleController().listAll),
  );

export default authRoutes;
