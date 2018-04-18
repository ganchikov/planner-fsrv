// absences-model.js - A mongoose model
// 
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const absences = new Schema({
    id: {type: Number, required: true},
    // parent_id: Number,
    name: String,
    start_date: Date,
    end_date: Date,
    confirmed: Boolean,
    absence_type: String
  }, {
    timestamps: true
  });

  return mongooseClient.model('absence', absences);
};
