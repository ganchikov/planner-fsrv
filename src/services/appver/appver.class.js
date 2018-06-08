const apv = require('appversion');
const {promisify} = require('util');

/* eslint-disable no-unused-vars */
class Service {
  constructor (options) {
    this.options = options || {};
  }

  async find (params) {
    const getAppVer = promisify(apv.getAppVersion);
    const appVer = await getAppVer();
    return {version: appVer.version, build: appVer.build.number};
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
