const mongoose = require('mongoose'),
{ Schema } = mongoose

const todoSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
}, { timestamps: true })

module.exports = mongoose.model("Todo", todoSchema);