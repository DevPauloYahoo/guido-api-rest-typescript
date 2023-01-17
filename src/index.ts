import express from 'express';

import { appDataSource } from './data-source';
import routes from './routes';

appDataSource
  .initialize()
  .then(() => {
    const app = express();

    app.use(express.json());

    app.use(routes);

    app.listen(process.env.SERVER_PORT, () =>
      console.log('Server running in the port', process.env.SERVER_PORT),
    );
  })
  .catch((err) => {
    console.error('Error Server running in the port', process.env.SERVER_PORT);
    console.error(err.message);
  });
