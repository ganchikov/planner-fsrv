// workspace-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const workspace = new Schema({
    id: {type: Number, required: true},       
    name: { type: String, required: true },
    users: [{type: Schema.Types.ObjectId, ref: 'user'}]
  }, {
    timestamps: true
  });

  return mongooseClient.model('workspace', workspace);
};
