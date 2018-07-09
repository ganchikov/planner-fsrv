const request = require('request');
const {JwksError} = require('../../errors');

/* eslint-disable no-unused-vars */
class Service {
  constructor (options) {
    this.options = options || {};
  }

  async find (params) {
    const uri = this.options.authentication.auth0.jwksUri;
    const strictSsl = this.options.authentication.auth0.strictSsl;
    return new Promise((resolve, reject) => {
      request({
          uri,
          strictSsl,
          json: true
        }, (err, res) => {
          if (err || res.statusCode < 200 || res.statusCode >= 300) {
            if (res) {
              reject(new JwksError(res.body && (res.body.message || res.body) || res.statusMessage || `Http Error ${res.statusCode}`));
            }
            reject(err);
          } else {
              var jwks = res.body.keys;
              resolve(jwks);
          }                
        });
    });     
  }

  async get (id, params) {
    return {
      id, text: `A new message with ID: ${id}!`
    };
  }

  async create (data, params) {
    if (Array.isArray(data)) {
      return await Promise.all(data.map(current => this.create(current)));
    }

    return data;
  }

  async update (id, data, params) {
    return data;
  }

  async patch (id, data, params) {
    return data;
  }

  async remove (id, params) {
    return { id };
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
