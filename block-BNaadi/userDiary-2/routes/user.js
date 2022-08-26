/** @format */

let express = require(`express`);

let route = express.Router();
let User = require(`../models/user`);

route.get(`/form`, (req, res) => {
  res.render(`userForm`);
});

route.post(`/create`, (req, res, next) => {
  User.create(req.body, (err, user) => {
    if (err) return next(err);
    res.render(`singleUser`, { user: user });
  });
});

route.post(`/:id/update`, (req, res, next) => {
  let id = req.params.id;

  User.findByIdAndUpdate(id, req.body, (err, user) => {
    if (err) return next(err);
    res.redirect(`/user/${id}/one`);
  });
});

route.get(`/all`, (req, res, next) => {
  User.find({}, (err, users) => {
    if (err) return next(err);
    res.render(`listUsers`, { users: users });
  });
});
route.get(`/:id/one`, (req, res, next) => {
  let id = req.params.id;
  User.findById(id, (err, user) => {
    if (err) return next(err);
    res.render(`singleUser`, { user: user });
  });
});

route.get(`/:id/edit`, (req, res, next) => {
  let id = req.params.id;
  User.findById(id, (err, user) => {
    if (err) return next(err);
    res.render(`userEditForm`, { user: user });
  });
});

route.get(`/:id/delete`, (req, res, next) => {
  let id = req.params.id;

  User.findByIdAndDelete(id, (err, user) => {
    if (err) return next(err);
    res.redirect(`/user/all`);
  });
});

module.exports = route;
