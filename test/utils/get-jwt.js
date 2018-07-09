const fs = require('fs');
const path = require('path');

const njwt = require('njwt');

module.exports = class JwtGen {

    constructor(authConfig) {
        this.authConfig = authConfig;
        this.privateKey = fs.readFileSync(path.join(process.cwd(), 'domain.key')).toString();
        this.publicKey = fs.readFileSync(path.join(process.cwd(), 'domain.crt')).toString();
    }

    getJwt () {       
        const claims = {
            iss: this.authConfig.jwt.issuer,
            aud: this.authConfig.jwt.audience,
          };        
        const jwt = njwt.create(claims, this.privateKey, this.authConfig.jwt.algorithm);        
        jwt.setHeader('kid', '1');
        return jwt;
    }
          
    getJwks() {
        const jwks = {
            keys: [
            {
                alg: this.authConfig.jwt.algorithm,
                kty: 'RSA',
                use: 'sig',
                x5c: this.publicKey,
                kid: '1'
            }
            ]
        };
        return jwks.keys;
    }
};