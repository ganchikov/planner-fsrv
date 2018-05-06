const request = require('request');

module.exports = function (app) {
    return function (url) {
      const config = app.get('authentication');
      const options = {
        jwt: config.jwt,
        secret: config.secret
      };

  
      return function (req, res, next) {
        if (req.feathers && req.feathers.payload) {

          const auth0route = `https://${config.auth0.domain}/oauth/token`;
          const clientId = config.auth0.clientID;
          const clientSecret = config.auth0.clientSecret;
          const redirect_uri = '/';
          const code = req.query.code;
          console.log(code);

          const options = { method: 'POST',
          url: auth0route,
          headers: { 'content-type': 'application/json' },
          body: 
           { grant_type: 'authorization_code',
             client_id: clientId,
             client_secret: clientSecret,
             code: code,
             redirect_uri: 'http://localhost:3030/' },
          json: true };
        
          request(options, function (error, response, body) {
            if (error) throw new Error(error);
            console.log(body);
          });

          // app.passport.createJWT(req.feathers.payload, options).then(token => {
          //   res.redirect(`${url}?token=${token}`);
          // })
          // .catch(error => {
          //   next(error);
          // });
        }
      };
    };
  };