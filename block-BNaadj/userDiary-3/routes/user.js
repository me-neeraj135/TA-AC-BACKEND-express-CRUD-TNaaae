/** @format */

let express = require(`express`);

let route = express.Router();
let User = require(`../models/user`);

route.get(`/`, (req, res) => {
  res.render(`userForm`);
});

route.post(`/new`, (req, res, next) => {
  User.create(req.body, (err, user) => {
    if (err) return next(err);
    res.render(`userDetails`, { user: user });
  });
});

route.get(`/:id/edit`, (req, res, next) => {
  let id = req.params.id;
  User.findById(id, (err, user) => {
    if (err) return next(err);
    res.render(`editForm`, { user: user });
  });
});

route.post(`/:id/update`, (req, res, next) => {
  let id = req.params.id;
  User.findByIdAndUpdate(id, req.body, (err, user) => {
    console.log(err, user);
    if (err) return next(err);
    res.redirect(`/user/${id}`);
  });
});

route.get(`/:id/delete`, (req, res, next) => {
  let id = req.params.id;

  console.log(id);

  User.findByIdAndDelete(id, (err, user) => {
    if (err) return next(err);
    res.redirect(`/user/list`);
  });
});

route.get(`/list`, (req, res, next) => {
  User.find({}, (err, users) => {
    if (err) return next(err);
    res.render(`usersList`, { users: users });
  });
});

route.get(`/:id`, (req, res, next) => {
  let id = req.params.id;

  User.findById(id, (err, user) => {
    if (err) return next(err);
    res.render(`userDetails`, { user: user });
  });
});
module.exports = route;
