import { Router } from 'express';

import { isProfile } from './auth';
import {
  RoomController,
  SubjectController,
  VideoController,
} from './controllers';
import { resolver } from './helpers';

const routes = Router();

// routes rooms
routes
  // cadastra novas salas
  .post(
    '/rooms',
    [isProfile(['ADMIN', 'USER'])],
    resolver(new RoomController().create),
  )
  // adiciona disciplinas nas salas
  .post(
    '/rooms/add-subjects',
    [isProfile(['ADMIN', 'USER'])],
    resolver(new RoomController().addSubject),
  )
  // busca todas as salas com paginação
  .get('/rooms/pagination', resolver(new RoomController().findAllPagination))
  // busca uma sala por ID
  .get('/rooms/:roomId', resolver(new RoomController().findById));

// routes subjects
// cadastra novas disciplinas
routes
  .post(
    '/subjects',
    [isProfile(['ADMIN', 'USER'])],
    resolver(new SubjectController().create),
  )
  // busca todas as salas
  .get('/subjects', resolver(new SubjectController().findAll));

// routes videos
// cadastra novos vídeos
routes.post(
  '/videos/:roomId/create',
  [isProfile(['ADMIN', 'USER'])],
  resolver(new VideoController().create),
);

export default routes;
