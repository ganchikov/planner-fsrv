function error(res){
    return res.send(401, 'Insufficient scope');
  }
  
module.exports = expectedScopes => {
    return async context => {
        if (!Array.isArray(expectedScopes)){
            throw new Error('Parameter expectedScopes must be an array of strings representing the scopes for the endpoint(s)');
        }
        if (expectedScopes.length === 0){
            return context();
        }
        if (!context.data.user || typeof context.data.user.scope !== 'string') { 
            throw 
        }
        var scopes = context.data.user.scope.split(' ');
        var allowed = expectedScopes.some(function(scope){
            return scopes.indexOf(scope) !== -1;
        });
    
        return allowed ?
        next() :
        
    }
}
  
  
  module.exports = function(expectedScopes) {
    
  
    return function(req, res, next) {
      
  };