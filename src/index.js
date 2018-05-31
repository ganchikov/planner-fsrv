/* eslint-disable no-console */
const fs = require('fs');
const https = require('https');
const logger = require('./config/winston');
const app = require('./app');
const port = app.get('port');

const httpsServer = https.createServer({
  key: fs.readFileSync('./.sslcert/localhost.key'),
  cert: fs.readFileSync('./.sslcert/localhost.cert')
}, app).listen(443);

httpsServer.on('listening', () =>
  logger.info('Feathers secured application started on https://%s:443', app.get('host'))
);

app.setup(httpsServer);

const server = app.listen(port);

/// TODO: only for dev testign purposes - don't forget to remove -> shift to default config section
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;

process.on('unhandledRejection', (reason, p) =>
  logger.error('Unhandled Rejection at: Promise ', p, reason)
);

server.on('listening', () =>
  logger.info('Feathers application started on http://%s:%d', app.get('host'), port)
);
