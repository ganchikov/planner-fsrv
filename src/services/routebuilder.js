const routePrefix = 'api';
const apiVer = 'v1';
module.exports = (routeName) => {
    return `/${routePrefix}/${apiVer}/${routeName}`;
}