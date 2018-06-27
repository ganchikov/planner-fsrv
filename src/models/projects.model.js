// projects-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const projects = new Schema({
    id: {type: Number, required: true},       
    name: { type: String, required: true },
    description: {type: String, required: false},
    workspace: {type: Schema.Types.ObjectId, ref: 'workspace'}
  }, {
    timestamps: true
  });

  return mongooseClient.model('projects', projects);
};
