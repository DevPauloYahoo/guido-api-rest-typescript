import { Router } from 'express';

import { SubjectController } from './controllers/subject.controller';

const routes = Router();

routes.post('/subjects', new SubjectController().create);

export default routes;
