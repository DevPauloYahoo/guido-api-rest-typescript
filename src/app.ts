import 'express-async-errors';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';

import { errorMiddleware } from './middlewares';
import routes from './routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use(routes);
app.use(errorMiddleware);

export default app;
