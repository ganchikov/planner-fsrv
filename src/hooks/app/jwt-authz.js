const {UnauthorizedError} = require('@errors');
const {authentication} = require('@constants/config');

module.exports = expectedScopes => {
    return async context => {
        try {
            const config = context.app.get(authentication);
            if (!config.enabled) {
                return context;
            }
            if (!Array.isArray(expectedScopes)){
                throw new Error('Parameter expectedScopes must be an array of strings representing the scopes for the endpoint(s)');
            }
            if (expectedScopes.length === 0){
                return context;
            }
            const noPermissionError = `User doesn't have required permission(s): ${expectedScopes.toString()}`;
            if (!context.sessionData) { 
                throw new UnauthorizedError('no_permission', { message: noPermissionError });
            }            
            var scopes = context.sessionData.decodedToken.payload.scope.split(' ');
            var allowed = expectedScopes.some(function(scope){
                return scopes.indexOf(scope) !== -1;
            });
        
            if (allowed) {
                return context;
            } else {
                throw new UnauthorizedError('no_permission', { message: noPermissionError });
            }    
        }    
        catch (err) {
            throw err;
        }
    };
};