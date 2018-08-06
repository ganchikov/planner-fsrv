// people-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const people = new Schema({
    id: {type: Number, required: true},   
    workspace: {type: Schema.Types.ObjectId, required: true, ref: 'workspace'},
    name: { type: String, required: true },
    absences: [{type: Schema.Types.ObjectId, ref: 'absence'}]
  }, {
    timestamps: true
  });

  return mongooseClient.model('person', people);
};
