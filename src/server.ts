import app from './app';
import { appDataSource } from './data-source';
import { createProfiles } from './libs';

const main = async () => {
  try {
    await appDataSource.initialize();
    console.log('Banco de Dados iniciado com sucesso');

    app.listen(process.env.SERVER_PORT, () =>
      console.log('Server running in the port', process.env.SERVER_PORT),
    );
  } catch (err: any) {
    console.error('Error Server running in the port', process.env.SERVER_PORT);
    console.error(err.message);
  }
};

main().then(() => {
  createProfiles();
});
