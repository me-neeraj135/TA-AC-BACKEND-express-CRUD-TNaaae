/** @format */

let express = require(`express`);
let User = require(`../models/user`);

let route = express.Router();

// give a user form
route.get(`/new`, (req, res) => {
  res.render(`userForm`);
});

// provide all users list
route.get(`/all`, (req, res, next) => {
  User.find({}, (err, user) => {
    console.log(user);
    if (err) return next(err);
    res.render(`allUser`, { users: user });
  });
});

// add user in the list

route.post(`/add`, (req, res, next) => {
  console.log(req.body);
  User.create(req.body, (err, user) => {
    if (err) return next(err);
    res.render(`userDetail`, { users: user });
  });
});

route.post(`/:_id/update`, (req, res, next) => {
  let id = req.params._id;

  console.log(`id===`, id);
  User.findByIdAndUpdate(id, req.body, (err, updatedUser) => {
    console.log(`user===`, updatedUser);
    if (err) return next(err);
    res.redirect(`/users/` + id);
  });
});

// edit user
route.get(`/:id/edit`, (req, res, next) => {
  let id = req.params.id;
  console.log(`id==`, id);
  User.findById(id, (err, user) => {
    console.log(`user `, user);
    if (err) return next(err);
    res.render(`editUserForm`, { users: user });
  });
});

// get user details

route.get(`/:id`, (req, res, next) => {
  let id = req.params.id;
  User.findById(id, (err, user) => {
    if (err) return next(err);

    res.render(`userDetail`, { users: user });
  });
});
module.exports = route;
