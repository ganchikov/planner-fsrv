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

  const route = routeBuilder(app, auth);

  const handler = makeHandler(app);

  // Set up authentication with the secret
  app.configure(authentication(Object.assign(config, {
    path: route,
    service: routeBuilder(app, users)
   })));
  app.configure(jwt());
  app.configure(local());

  app.configure(oauth2(Object.assign({
    name: 'auth0',
    Strategy: Auth0Strategy,
    handler: handler(config.auth0.callbackURL),
    verifier,
  }, config.auth0)));

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

  
};
