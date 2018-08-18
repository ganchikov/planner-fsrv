const request = require('request');
const {JwksError, SigningKeyNotFoundError} = require('@errors');
const jwtGen = require('@helpers/jwt-gen');


function certToPEM(cert) {
    cert = cert.match(/.{1,64}/g).join('\n');
    cert = `-----BEGIN CERTIFICATE-----\n${cert}\n-----END CERTIFICATE-----\n`;
    return cert;
}

module.exports = class JwksClient {
    constructor(options, jwksService) {
        this.options = options;
        this.jwksService = jwksService;
        ///TODO: consider refactoring later
        // for test env (test run) use generated jwks
        if (process.env.NODE_ENV == 'test') {
            const jwt = new jwtGen(options);
            options.jwks = jwt.getJwks();
        }
    }
  
    getJwks() {
        const uri = this.options.auth0.jwksUri;
        const strictSsl = this.options.auth0.strictSsl;
        // if jwks is provided in options - return it, otherwise do http request
        return new Promise((resolve, reject) => {
          if (this.options.jwks) {
            resolve(this.options.jwks);
          } else {
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
          }        
        });         
    }

    getSigningKeys() {
        return new Promise((resolve, reject) => {
            this.getJwks().then(keys => {
                if (!keys || !keys.length) {
                    reject(new JwksError('The JWKS endpoint did not contain any keys'));
                }
                const signingKeys = keys
                .filter(key => key.use === 'sig' // JWK property `use` determines the JWK is for signing
                            && key.kty === 'RSA' // We are only supporting RSA
                            && key.kid           // The `kid` must be present to be useful for later
                            && key.x5c && key.x5c.length // Has useful public keys (we aren't using n or e)
                ).map(key => {
                    return { kid: key.kid, nbf: key.nbf, publicKey: (this.options.mockJwt && this.options.mockJwt.PEM) ? key.x5c : certToPEM(key.x5c[0])};
                });
                // If at least a single signing key doesn't exist we have a problem... Kaboom.
                if (!signingKeys.length) {
                    reject(new JwksError('The JWKS endpoint did not contain any signing keys'));
                }        
                // Returns all of the available signing keys.
                resolve(signingKeys);
            }, error=> {
                reject(error);
            });
        });
    }

    getSigningKey(kid) {
        return new Promise((resolve, reject) => {
            this.getSigningKeys().then(keys => {
                const signingKey = keys.find(key => key.kid === kid);
                if (!signingKey) {
                    var error = new SigningKeyNotFoundError(`Unable to find a signing key that matches '${kid}'`);
                    reject(error);
                }                 
                resolve(signingKey);
            }).catch(err => {
                reject(err);
            });
        });
    }
};