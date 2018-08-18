const {UnauthorizedError} = require('@errors');

module.exports = (header) => {
    if (!header) {
        throw new UnauthorizedError('credentials_required', { message: 'No authorization token was found' });
    }
    const parts= header.split(' ');
    if (parts.length != 2) {
        throw new UnauthorizedError('credentials_required', { message: 'No authorization token was found' });
    }

    const scheme = parts[0];
    if(!/^Bearer$/i.test(scheme)) {    
        throw new UnauthorizedError('credentials_bad_scheme', { message: 'Format is Authorization: Bearer [token]' });
    }

    const token = parts[1];
    return token;
};