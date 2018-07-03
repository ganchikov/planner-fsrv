const jwt = require('jsonwebtoken');
const extractToken = require('../../helpers/extract_token');
const { UnauthorizedError } = require('../../errors');

module.exports = options => {
    
    const secretCallback = options.secret;
    const config = options.config;

    return async context => {
        try {        
            if (!config.enabled) {
                return context;                
            }

            const authHeader = context.params.headers.authorization;
            if (!authHeader) {
                throw new UnauthorizedError('credentials_required', { message: 'No authorization token was found' });
            }
            const token = extractToken(authHeader);

            // This could fail.  If it does handle as 401 as the token is invalid.
            const decodedToken = jwt.decode(token, {complete: true});

            if (!decodedToken) {
                throw new UnauthorizedError('credentials_bad_token', {message: 'Bad token provided'});
            }

            if (decodedToken.header.alg !== 'RS256') {
            // we are only supporting RS256 so fail if this happens.
                throw new Error();
            }
                
            const secret = await secretCallback(decodedToken.header, decodedToken.payload);
            const result = await new Promise((resolve, reject) => {
                jwt.verify(token, secret, config.jwt, function(err, decoded) {
                    if (err) {
                        reject(new UnauthorizedError('invalid_token', err));
                    } else {
                        resolve(decoded);
                    }
                });
            }); 
            if (!context.sessionData) {                
                context.sessionData = {user: result, token};
            } else {
                context.sessionData.user = result;
                context.sessionData.token = token;
            }
            
            return context;
        } catch (err) {
            throw err;
        }

    };
};
