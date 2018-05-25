// idgenerator-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.

module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const idgenerator = new Schema({
    counter_id: { type: String, required: true},
    sequence_val: {type: Number,default: 1}
  }, {
    timestamps: true
  });

  return mongooseClient.model('counter', idgenerator);
};
