// const main = async () => {
//   await appDataSource.initialize();
//   try {
//     console.log('Banco de Dados iniciado com sucesso');
//     app.listen(process.env.SERVER_PORT, () =>
//       console.log('Server running in the port', process.env.SERVER_PORT),
//     );
//   } catch (err: any) {
//     console.error('Error Server running in the port', process.env.SERVER_PORT);
//     console.error(err.message);
//   }
// };
//
// main();

// exportação de arquivos
export * from './app';
export * from './data-source';
export * from './routes';
export * from './server';

// exportação de pastas
export * from './controllers';
export * from './entities';
export * from './helpers';
export * from './middlewares';
export * from './repositories';
export * from './auth';
