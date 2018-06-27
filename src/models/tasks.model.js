// tasks-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const tasks = new Schema({
    id: {type: Number, required: true},       
    name: { type: String, required: true },
    description: { type: String, required: true },
    assignee: {type: Schema.Types.ObjectId, ref: 'people'}
  }, {
    timestamps: true
  });

  return mongooseClient.model('tasks', tasks);
};
