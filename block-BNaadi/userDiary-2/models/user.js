/** @format */

let mongoose = require(`mongoose`);

let Schema = mongoose.Schema;

let userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, lowercase: true, match: /@/ },
  age: { type: Number },
  bio: { type: String },
});

let User = mongoose.model(`User`, userSchema);

module.exports = User;
