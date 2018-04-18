const appRoot = require('app-root-path');
const winston = require('winston');
const config = winston.config;
const timestamp = () => {
    return Date.now();
};
const formatter = (options) => {
    return `${options.timestamp()} ${config.colorize(options.level, options.level.toUpperCase())} 
      ${options.message} ${options.meta && Object.keys(options.meta).length ? '\n\t' + JSON.stringify(options.meta) : null}
    `;
};

const options = {
    file: {
      level: 'info',
      filename: `${appRoot}/logs/app.log`,
      handleExceptions: true,
      json: true,
      maxsize: 5242880, // 5MB
      maxFiles: 5,
      colorize: false,
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


  const logger = new winston.Logger({
    transports: [
      new winston.transports.File(options.file),
      new winston.transports.Console(options.console)
    ],
    exitOnError: false, // do not exit on handled exceptions   
  });

  logger.stream = {
    write: function(message, encoding) {
      logger.info(message);
    },
  };

  module.exports = logger;