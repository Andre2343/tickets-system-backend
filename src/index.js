/* eslint-disable global-require */
import express from 'express';
import config from './config';
import Logger from './utils/logger';

async function startServer() {
  const app = express();

  await require('./loaders').default({ expressApp: app });
  const apolloServer = require('./graphql').default;

  app.listen(config.port, (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    }
    Logger.info(`
    #############################################
      Server listening on port: ${config.port} 
      Address: http://localhost:${config.port} ️
    ️  GraphQL: http://localhost:${config.port}${apolloServer.graphqlPath}
    #############################################
  `);
  });
}

startServer();
