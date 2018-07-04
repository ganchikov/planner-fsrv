// workspace-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const workspace = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'user', required: true}    
  }, {
    timestamps: true
  });

  return mongooseClient.model('workspace', workspace);
};
