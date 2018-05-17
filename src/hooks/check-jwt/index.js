const expressJwt = require('./expressJwt');
const expressJwtSecret = require('./lib/expressJwtSecret');

module.exports = () => {
  return expressJwt(
    {
      secret: expressJwtSecret({
        jwksUri: 'https://xplanner.auth0.com/.well-known/jwks.json'
      }),
    
      // Validate the audience and the issuer.
      audience: 'http://localhost:3030/api/v1',
      issuer: 'https://xplanner.auth0.com/',
      algorithms: ['RS256']
    });
};