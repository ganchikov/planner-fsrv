// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  
  const users = new mongooseClient.Schema({
    authId: {type: String, required: true, unique: true},  
    name: {type: String, required: true},
    nick: {type: String},
    defaultWorkspaceId: {type: Schema.Types.ObjectId, ref: 'workspace'},
    workspaces: [{type: Schema.Types.ObjectId, ref: 'workspace'}]
  }, {
    timestamps: true
  });

  return mongooseClient.model('users', users);
};
