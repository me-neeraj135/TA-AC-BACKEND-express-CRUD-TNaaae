/** @format */

let mongoose = require(`mongoose`);
let Schema = mongoose.Schema;

let userDiarySchema = new Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/@/],
      unique: true,
      required: `Email address is required`,
    },
    age: { type: Number, min: 18, max: 30 },
  },
  { timestamps: true }
);

let Diary = mongoose.model(`Diary`, userDiarySchema);
module.exports = Diary;
