const jwt = require('express-jwt');
const jwtAuthz = require('express-jwt-authz');
const jwksRsa = require('jwks-rsa');

const checkJwt = jwt({
    // Dynamically provide a signing key
    // based on the kid in the header and 
    // the signing keys provided by the JWKS endpoint.
    secret: jwksRsa.expressJwtSecret({
      cache: true,
      rateLimit: true,
      jwksRequestsPerMinute: 5,
      jwksUri: 'https://xplanner.auth0.com/.well-known/jwks.json',
      strictSsl: false,
    }),
  
    // Validate the audience and the issuer.
    audience: 'http://localhost:3030/api/v1',
    issuer: 'https://xplanner.auth0.com/',
    algorithms: ['RS256']
  });

module.exports = checkJwt;