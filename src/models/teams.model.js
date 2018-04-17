// teams-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const teams = new Schema({
    id: {type: Number},   
    name: { type: String, required: true },
    members: [{type: Schema.Types.ObjectId, ref: 'people'}]
  }, {
    timestamps: true
  });

  return mongooseClient.model('teams', teams);
};
