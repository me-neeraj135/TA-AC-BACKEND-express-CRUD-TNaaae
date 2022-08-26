/** @format */

let mongoose = require(`mongoose`);
let Schema = mongoose.Schema;
let validate = require(`validator`);
let userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, lowercase: true, match: /@/ },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if (value < 0) {
        throw new Error(`Age must be a positive number`);
      }
    },
  },
  address: { type: String },
  bio: { type: String },
  hobbies: { type: [String] },
});

let User = mongoose.model(`User`, userSchema);

module.exports = User;
