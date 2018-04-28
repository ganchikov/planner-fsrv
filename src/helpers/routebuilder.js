module.exports = (app, routeName) => {
    const routePrefix = app.get('routePrefix');
    const apiVer = app.get('apiVer');
    return `/${routePrefix}/${apiVer}/${routeName}`;
};