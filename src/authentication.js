const authentication = require('@feathersjs/authentication');
const jwt = require('@feathersjs/authentication-jwt');
const local = require('@feathersjs/authentication-local');
const oauth2 = require('@feathersjs/authentication-oauth2');
const Auth0Strategy = require('passport-auth0');

const routeBuilder = require('./helpers/routebuilder');
const {auth, users} = require('./constants/services');

// Bring in the oauth-handler
const makeHandler = require('./oauth-handler');
const verifier = require('./oauth-verifier');


module.exports = function (app) {

  const config = app.get(auth);

  const clientID = config.auth0.clientID;
  const clientSecret = config.auth0.clientSecret;

  const strategy = new Auth0Strategy(
    {
      domain: config.auth0.domain,
      clientID,
      clientSecret,
      callbackURL: 'http://localhost:3030/callback'
    },
    function(accessToken, refreshToken, extraParams, profile, done) {
      // accessToken is the token to call Auth0 API (not needed in the most cases)
      // extraParams.id_token has the JSON Web Token
      // profile has all the information from the user
      return done(null, profile);
    }
  );

  

  const route = routeBuilder(app, auth);

  const handler = makeHandler(app);

  // Set up authentication with the secret
  app.configure(authentication(Object.assign(config, {
    path: route,
    service: routeBuilder(app, users)
   })));
  app.configure(jwt());
  app.configure(local());

  const oauth2cfg = Object.assign(
    config.auth0, {
      name: 'auth0',
      Strategy: Auth0Strategy,
      // handler: handler(config.auth0.callbackURL),
      verifier,

      // callbackURL: 'http(s)://hostname[:port]/auth/<provider>/callback',
      service: routeBuilder(app, users)
    });

  app.configure(oauth2(oauth2cfg));
  app.passport.use(strategy);

  // The `authentication` service is used to create a JWT.
  // The before `create` hook registers strategies that can be used
  // to create a new valid JWT (e.g. local or oauth2)
  app.service(route).hooks({
    before: {
      create: [
        authentication.hooks.authenticate(config.strategies)
      ],
      remove: [
        authentication.hooks.authenticate('jwt')
      ]
    }
  });

  app.use('/callback', app.passport.authenticate('auth0', {
    failureRedirect: '/failure'
  }), (req, res) => {
    res.redirect('/success.html');
  });

};
