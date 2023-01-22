import { Router } from 'express';

import {
  RoomController,
  SubjectController,
  VideoController,
} from './controllers';
import { resolver } from './helpers';
import {
  RoomCreateMiddleware,
  SubjectCreateMiddleware,
  VideoCreateMiddleware,
} from './middlewares';

const routes = Router();

routes.post(
  '/rooms',
  [RoomCreateMiddleware],
  resolver(new RoomController().create),
);
routes.get('/rooms/:roomId', [], resolver(new RoomController().findById));
routes.post('/rooms/add-subjects', resolver(new RoomController().addSubject));
routes.post(
  '/subjects',
  [SubjectCreateMiddleware],
  resolver(new SubjectController().create),
);
routes.post(
  '/videos/:roomId/create',
  [VideoCreateMiddleware],
  resolver(new VideoController().create),
);

export default routes;
