/** @format */

let express = require(`express`);
let router = express.Router();
let User = require(`../models/user`);

router.get(`/new`, (req, res) => {
  res.render(`../views/form.ejs`);
});

router.post(`/`, (req, res, next) => {
  User.create(req.body, (err, userAdded) => {
    if (err) {
      res.redirect(`/user/new`);
    } else {
      res.redirect(`/index`);
    }
  });
});

module.exports = router;
