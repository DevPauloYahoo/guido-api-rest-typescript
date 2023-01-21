import { Router } from 'express';

import {
  RoomController,
  SubjectController,
  VideoController,
} from './controllers';
import {
  RoomCreateMiddleware,
  SubjectCreateMiddleware,
  VideoCreateMiddleware,
} from './middlewares';

const routes = Router();

routes.post('/rooms', [RoomCreateMiddleware], new RoomController().create);
routes.post('/rooms/add-subjects', new RoomController().addSubject);
routes.post(
  '/subjects',
  [SubjectCreateMiddleware],
  new SubjectController().create,
);
routes.post(
  '/videos/:roomId/create',
  [VideoCreateMiddleware],
  new VideoController().create,
);

export default routes;
