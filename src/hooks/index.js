module.exports = {
    checkAccessToken: require ('./app/check-access-token'),
    authenticateUser: require('./app/authenticate-user'),
    getUserWorkspace: require('./app/get-user-workspace'),
    jwtAuthz: require('./app/jwt-authz'),
    logger: require('./app/logger'),
    generateId: require('./app/generate-id'),
    getChildren: require('./app/getchildren'),
    removeChildren: require('./app/remove-children'),
    getDiff: require('./app/get-diff'),
    processDiff: require('./app/process-diff'),
    getUserInfo: require('./authenticate/get-user-info'),
    checkUserAuthentication: require('./authenticate/check-user-authentication'),
    createUserWorkspace: require('./users/create-user-workspace'),



};
