import { Router } from 'express';

import { authMiddleware } from './auth';
import {
  RoomController,
  SubjectController,
  VideoController,
} from './controllers';
import { resolver } from './helpers';

const routes = Router();

routes.use(authMiddleware);

// routes rooms
routes
  .post('/rooms', [], resolver(new RoomController().create))
  .get(
    '/rooms/pagination',
    [],
    resolver(new RoomController().findAllPagination),
  )
  .get('/rooms/:roomId', [], resolver(new RoomController().findById))
  .post('/rooms/add-subjects', resolver(new RoomController().addSubject));

// routes subjects
routes
  .post('/subjects', [], resolver(new SubjectController().create))
  .get('/subjects', resolver(new SubjectController().findAll));

// routes videos
routes.post(
  '/videos/:roomId/create',
  [],
  resolver(new VideoController().create),
);

// routes profiles and roles
// routes
//   .post('/profiles', resolver(new ProfileController().create))
//   .post('/roles', resolver(new RoleController().create));

export default routes;
