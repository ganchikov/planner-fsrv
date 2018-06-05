const appRoot = require('app-root-path');
const winston = require('winston');
const fs = require('fs');

const config = winston.config;
const timestamp = () => {
    return new Date(Date.now()).toUTCString();
};
const formatter = (options) => {
    return `${config.colorize(options.level, options.level.toUpperCase())} 
      ${options.message} ${options.timestamp()} ${options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : null}
    `;
};

const logDir = `${appRoot}/logs`;
const logFile = logDir.concat('/app.log');

const options = {
    file: {
      level: 'info',
      filename: logFile,
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: true,
      timestamp,
      formatter,      
    },
    console: {
      level: 'info',
      handleExceptions: true,
      json: true,
      colorize: true,
      timestamp,
      formatter,
    },
  };

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
} else if (!fs.existsSync(logFile)) {
  fs.writeFileSync(logFile, null);
}

const logger = new winston.Logger({
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console)
  ],
  exitOnError: false, // do not exit on handled exceptions   
  handleExceptions: true

});

logger.stream = {
  // write: function(message, encoding) {        
  write: function(message) {        
    logger.info(message);
  },
};

module.exports = logger;