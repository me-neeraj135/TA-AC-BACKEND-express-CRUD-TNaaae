/** @format */

let mongoose = require(`mongoose`);
let Schema = mongoose.Schema;
let studentSchema = new Schema(
  {
    name: { type: String },
    email: { type: String },
  },
  { timestamps: true }
);

let Student = mongoose.model(`Student`, studentSchema);

module.exports = Student;
