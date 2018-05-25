const jwt = require('jsonwebtoken');
const async = require('async');

const { UnauthorizedError } = require('../../errors');

module.exports = options => {
    
    const secretCallback = options.secret;

    return async context => {
        try {

            const authHeader = context.params.headers.authorization;
            if (!authHeader) {
                throw new UnauthorizedError('credentials_required', { message: 'No authorization token was found' });
            }
            const parts= authHeader.split(' ');
            if (parts.length != 2) {
                throw new UnauthorizedError('credentials_required', { message: 'No authorization token was found' });
            }
        
            const scheme = parts[0];
            if(!/^Bearer$/i.test(scheme)) {    
                throw new UnauthorizedError('credentials_bad_scheme', { message: 'Format is Authorization: Bearer [token]' });
            }
        
            const token = parts[1];

            // This could fail.  If it does handle as 401 as the token is invalid.
            const decodedToken = jwt.decode(token, {complete: true});

            if (decodedToken.header.alg !== 'RS256') {
            // we are only supporting RS256 so fail if this happens.
                throw new Error();
            }
                
            const secret = await secretCallback(decodedToken.header, decodedToken.payload);
            const result = await new Promise((resolve, reject) => {
                jwt.verify(token, secret, options, function(err, decoded) {
                    if (err) {
                        reject(new UnauthorizedError('invalid_token', err));
                    } else {
                        resolve(decoded);
                    }
                });
            }); 
            // context.app.set('jwt', result);
            if (!context.data) {
                context.data = {user: result};
            } else {
                context.data.user = result;
            }
            
            return context;
        } catch (err) {
            throw err;
        }

    };
};
