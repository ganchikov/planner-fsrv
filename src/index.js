/* eslint-disable no-console */
const logger = require('./config/winston');
const app = require('./app');
const port = app.get('port');
const server = app.listen(port);

/// TODO: only for dev testign purposes - don't forget to remove -> shift to default config section
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>
  logger.info('Feathers application started on http://%s:%d', app.get('host'), port)
);
