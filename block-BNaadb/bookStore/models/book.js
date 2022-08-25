/** @format */

let mongoose = require(`mongoose`);
let Schema = mongoose.Schema;

let bookSchema = new Schema(
  {
    title: { type: String, required: true },
    author: { type: String },
    descriptions: { type: String, required: true },
    price: { type: Number },
  },
  { timestamps: true }
);

let Book = mongoose.model(`Book`, bookSchema);

module.exports = Book;
