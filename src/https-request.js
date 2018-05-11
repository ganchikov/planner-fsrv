const request = require('request');
const rest = require('@feathersjs/rest-client');
const fs = require('fs');
const restClient = rest();


const requestClient = request.defaults({
  agentOptions: {
      ca: fs.readFileSync('luxcert-root.pem')
  }
});

module.exports = (app) => {
    app.configure(restClient.request(requestClient));
};



