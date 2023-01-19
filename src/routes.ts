import { Router } from 'express';

import { RoomController } from './controllers/room.controller';
import { SubjectController } from './controllers/subject.controller';
import { VideoController } from './controllers/video.controller';

const routes = Router();

routes.post('/rooms', new RoomController().create);
routes.post('/rooms/add-subjects', new RoomController().addSubject);
routes.post('/subjects/add-rooms', new SubjectController().addRoom);
routes.post('/subjects', new SubjectController().create);
routes.post('/videos/:roomId/create', new VideoController().create);

export default routes;
