const fs = require('fs');
const path = require('path');

const njwt = require('njwt');

module.exports = class JwtGen {

    constructor(authConfig) {
        this.authConfig = authConfig;
        this.privateKey = fs.readFileSync(path.join(process.cwd(), 'domain.key')).toString();
        this.publicKey = fs.readFileSync(path.join(process.cwd(), 'domain.crt')).toString();
    }

    getAccessToken () {       
        const claims = {
            iss: this.authConfig.mockJwt.issuer,
            aud: this.authConfig.mockJwt.audience,
            scope: this.authConfig.mockJwt.scope
          };        
        const jwt = njwt.create(claims, this.privateKey, this.authConfig.mockJwt.algorithm);        
        jwt.setHeader('kid', '1');
        return jwt;
    }

    getIdToken () {
        const claims = {
            name: this.authConfig.mockJwt.name,
            sub: this.authConfig.mockJwt.sub,
            nickname: this.authConfig.mockJwt.nickname

        };
        const jwt = njwt.create(claims, this.privateKey, this.authConfig.mockJwt.algorithm);    
        return jwt;
    }

          
    getJwks() {
        const jwks = {
            keys: [
            {
                alg: this.authConfig.mockJwt.algorithm,
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