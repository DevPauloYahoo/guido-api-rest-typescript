import { Router } from 'express';

import {
  RoomController,
  SubjectController,
  VideoController,
} from './controllers';
import { roomCreateMiddleware } from './middlewares/room-validation.middleware';

const routes = Router();

routes.post('/rooms', [roomCreateMiddleware], new RoomController().create);
routes.post('/rooms/add-subjects', new RoomController().addSubject);
routes.post('/subjects', new SubjectController().create);
routes.post('/videos/:roomId/create', new VideoController().create);

export default routes;
