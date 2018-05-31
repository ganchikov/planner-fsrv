const fs = require('fs');
const https = require('https');

module.exports = function (app) {
const logger = app.get('logger');
const sslCertPath = app.get('sslCertPath');

if (!fs.existsSync(sslCertPath.concat('/localhost.key') || !fs.existsSync(sslCertPath.concat('/localhost.cert')))) {
    logger.info('SSL cert is missing, cannot start https mode');
    return;
}

const httpsServer = https.createServer({
    key: fs.readFileSync('./.sslcert/localhost.key'),
    cert: fs.readFileSync('./.sslcert/localhost.cert')
  }, app).listen(443);
  
  httpsServer.on('listening', () =>
    logger.info('Feathers secured application started on https://%s:443', app.get('host'))
  );
  
  app.setup(httpsServer);

};