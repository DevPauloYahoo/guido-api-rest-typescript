import { Router } from 'express';

import {
  RoomController,
  SubjectController,
  VideoController,
} from './controllers';
import { resolver } from './helpers';
import { VideoCreateMiddleware } from './middlewares';

const routes = Router();

// routes subjects
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
routes.post('/subjects', [], resolver(new SubjectController().create));

// routes subjects
routes.post(
  '/videos/:roomId/create',
  [VideoCreateMiddleware],
  resolver(new VideoController().create),
);

export default routes;
