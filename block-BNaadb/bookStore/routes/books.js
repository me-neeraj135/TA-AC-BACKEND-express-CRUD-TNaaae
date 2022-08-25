/** @format */

let express = require(`express`);
let Book = require(`../models/book`);

let route = express.Router();

route.post(`/create`, (req, res, next) => {
  Book.create(req.body, (err, book) => {
    if (err) return next(err);
    res.render(`book`, { books: book });
  });
});

route.get(`/`, (req, res) => {
  res.render(`index`);
});

route.get(`/form`, (req, res) => {
  res.render(`bookForm`);
});
route.get(`/find`, (req, res, next) => {
  Book.find({}, (err, book) => {
    if (err) return next(err);
    res.render(`allBooks`, { books: book });
  });
});

route.get(`/:id/delete`, (req, res, next) => {
  let id = req.params.id;
  Book.findByIdAndDelete(id, (err, boos) => {
    if (err) return next(err);
    res.redirect(`/books/find`);
  });
});

module.exports = route;
