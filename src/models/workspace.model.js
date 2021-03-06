// workspace-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const workspace = new Schema({
    users: [{type: Schema.Types.ObjectId, ref: 'user'}]    
  }, {
    timestamps: true
  });

  return mongooseClient.model('workspace', workspace);
};
