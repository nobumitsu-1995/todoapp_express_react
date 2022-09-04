const mongoose = require('mongoose'),
{ Schema } = mongoose

var todoSchema = new Schema({
  content: {
    type: String,
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model("Todo", todoSchema);