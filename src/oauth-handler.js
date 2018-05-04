module.exports = function (app) {
    return function (url) {
      const config = app.get('authentication');
      const options = {
        jwt: config.jwt,
        secret: config.secret
      };

  
      return function (req, res, next) {
        if (req.feathers && req.feathers.payload) {

          const auth0route = new String(config.auth0.domain).concat('/oauth/token');
          const clientId = config.auth0.clientID;
          const clientSecret = config.auth0.clientSecret;
          const redirect_uri = '/';
          const code = req.feathers.payload.code;


          app.passport.createJWT(req.feathers.payload, options).then(token => {
            res.redirect(`${url}?token=${token}`);
          })
          .catch(error => {
            next(error);
          });
        }
      };
    };
  };