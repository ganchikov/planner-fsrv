module.exports = {
    checkAccessToken: require ('./check-access-token'),
    GenerateId: require('./generate-id'),
    GetChildren: require('./getchildren'),
    JwtAuthz: require('./jwt-authz'),
    Logger: require('./logger'),
    getUserInfo: require('./get-user-info'),
    authenticateUser: require('./authenticate-user'),
    createUserWorkspace: require('./create-user-workspace'),
    checkUserAuthentication: require('./check-user-authentication'),
    getQueryForRemoval: require('./get-params-for-removal'),
    removeChildren: require('./remove-children')
};
