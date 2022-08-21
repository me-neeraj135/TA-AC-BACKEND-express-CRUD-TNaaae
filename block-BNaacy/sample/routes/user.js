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
      res.render(`../views/form.ejs`);
    } else {
      res.render(`../views/index.ejs`, {});
    }
  });
});

module.exports = router;
