/** @format */

let mongoose = require(`mongoose`);
let Schema = mongoose.Schema;
let userSchema = new Schema(
  {
    name: { type: String },
    email: { type: String, lowercase: true, match: [/@/] },
    age: { type: Number, min: 18, max: 30 },
  },
  { timestamps: true }
);

let User = mongoose.model(`User`, userSchema);

module.exports = User;
