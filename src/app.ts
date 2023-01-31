import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

import authRoutes from './auth/auth.routes';
import { errorsGlobalMiddleware } from './middlewares';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use([routes, authRoutes]);
app.use(errorsGlobalMiddleware);

export default app;
