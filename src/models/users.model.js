// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const users = new mongooseClient.Schema({
    auth0id: {type: String, required: true, unique: true},  
    name: {type: String, required: true},
    nick: {type: String},
  }, {
    timestamps: true
  });

  return mongooseClient.model('users', users);
};
