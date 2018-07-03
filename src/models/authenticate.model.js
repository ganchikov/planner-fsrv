// authorize-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const authenticate = new Schema({
    token: {type: Number, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'user'},
    workspace: {type: Schema.Types.ObjectId, ref: 'workspace'}
  }, {
    timestamps: true
  });

  return mongooseClient.model('authenticate', authenticate);
};
