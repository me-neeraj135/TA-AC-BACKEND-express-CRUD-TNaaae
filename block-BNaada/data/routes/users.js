/** @format */

let express = require(`express`);
const { rawListeners } = require("../models/user");
let router = express.Router();
let User = require(`../models/user`);

router.post(`/new`, (req, res, next) => {
  console.log(req.body);
  User.create(req.body, (err, user) => {
    if (err) return next(err);
    res.render(`../views/user.ejs`, { user: user });
  });
});

router.get(`/new`, (req, res) => {
  res.render(`../views/form.ejs`);
});

router.get(`/`, (req, res, next) => {
  User.find({}, (err, users) => {
    if (err) return next(err);
    res.render(`../views/users.ejs`, { users: users });
  });

  router.get(`/:id`, (req, res, next) => {
    let id = req.params.id;
    User.findById(id, (err, user) => {
      console.log(user);
      if (err) return next(err);
      res.render(`../views/user.ejs`, { user: user });
    });
  });

  router.get(`/delete/:id`, (req, res, next) => {
    let id = req.params.id;
    User.findByIdAndDelete(id, (err, user) => {
      if (err) return next(err);

      res.redirect(`/users`);
    });
  });
});
module.exports = router;
