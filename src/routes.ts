import { Router } from 'express';

import {
  RoomController,
  SubjectController,
  VideoController,
} from './controllers';

const routes = Router();

routes.post('/rooms', new RoomController().create);
routes.post('/rooms/add-subjects', new RoomController().addSubject);
routes.post('/subjects/add-rooms', new SubjectController().addRoom);
routes.post('/subjects', new SubjectController().create);
routes.post('/videos/:roomId/create', new VideoController().create);

export default routes;
