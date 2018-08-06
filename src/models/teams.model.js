// teams-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const teams = new Schema({
    id: {type: Number, required: true},   
    name: { type: String, required: true },
    members: [{type: Schema.Types.ObjectId, ref: 'person'}],
    workspace: {type: Schema.Types.ObjectId, required: true, ref: 'workspace'},
  }, {
    timestamps: true
  });

  return mongooseClient.model('teams', teams);
};
