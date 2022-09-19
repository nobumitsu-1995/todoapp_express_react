const mongoose = require('mongoose'),
{ Schema } = mongoose,
passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    trim: true,
    required: true,
    lowercase: true,
    unique: true
  },
}, { timestamps: true })

userSchema.plugin(passportLocalMongoose, {
  usernameField: "email"
})

module.exports = mongoose.model("User", userSchema);