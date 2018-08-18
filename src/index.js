/* eslint-disable no-console */
require('module-alias/register');

const app = require('./app');

const port = app.get('port');

const server = app.listen(port);
const logger = app.get('logger');

process.on('unhandledRejection', (reason, p) =>
  logger.error(p, reason));

server.on('listening', () =>
  logger.info('Feathers application started on http://%s:%d', app.get('host'), port)
);
