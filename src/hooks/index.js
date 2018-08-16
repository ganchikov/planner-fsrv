module.exports = {
    checkAccessToken: require ('./check-access-token'),
    generateId: require('./generate-id'),
    getChildren: require('./getchildren'),
    jwtAuthz: require('./jwt-authz'),
    logger: require('./logger'),
    getUserInfo: require('./get-user-info'),
    authenticateUser: require('./authenticate-user'),
    createUserWorkspace: require('./create-user-workspace'),
    checkUserAuthentication: require('./check-user-authentication'),
    removeChildren: require('./remove-children'),
    getDiff: require('./get-diff'),
    processDiff: require('./process-diff')
};
