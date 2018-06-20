const fs = require('fs');
const https = require('https');

module.exports = function (app) {
  const logger = app.get('logger');
  const sslSettings = app.get('ssl');
  if (!sslSettings.enabled) {
    logger.info('SSL is disabled');
    return;
  }
  const sslCertPath = sslSettings.sslCertPath;

  if (!fs.existsSync(sslCertPath.concat('/localhost.key') || !fs.existsSync(sslCertPath.concat('/localhost.cert')))) {
      logger.info('SSL cert is missing, cannot start https mode');
      return;
  }

  const httpsServer = https.createServer({
      key: fs.readFileSync('./.sslcert/domain-key.key'),
      cert: fs.readFileSync('./.sslcert/domain-crt.cert')
    }, app).listen(443);
  
  httpsServer.on('listening', () =>
    logger.info('Feathers secured application started on https://%s:443', app.get('host'))
  );
  
  app.setup(httpsServer);

};