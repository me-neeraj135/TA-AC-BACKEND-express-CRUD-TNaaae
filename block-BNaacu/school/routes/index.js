/** @format */

let express = require(`express`);

let router = express.Router();

router.get(`/`, (req, res) => {
  res.render(`index`, { note: `welcome to routing` });
});

router.get(`/about`, (req, res) => {
  res.render(`about`, { about: `This is about routing` });
});

module.exports = router;
