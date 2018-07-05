const { ArgumentError } = require('../../errors');
const JwksClient = require('./JwksClient');


module.exports = (options) => {
  if (options === null || options === undefined) {
    throw new ArgumentError('An options object must be provided when initializing expressJwtSecret');
  }
  const client = new JwksClient(options);
  return function secretProvider(header) {
    return new Promise((resolve, reject) => {
      if (!header || header.alg !== options.jwt.algorithm) {
        reject();
      }
      client.getSigningKey(header.kid).then(key => {
        resolve(key.publicKey || key.rsaPublicKey);
      }).catch(err => {
        reject(err);
      });
    });
  };
};
