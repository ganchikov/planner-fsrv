// authorize-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const authorize = new Schema({
    access_token_hash: {type: Number, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'user'}
  }, {
    timestamps: true
  });

  return mongooseClient.model('authorize', authorize);
};
