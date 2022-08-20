/** @format */

let express = require(`express`);
const { updateOne } = require("../models/userDiary");
let UserDiary = require(`../models/userDiary`);
let router = express.Router();

router.get(`/`, (req, res) => {
  UserDiary.find({}, (err, diary) => {
    console.log(err);
    console.log(diary);
    res.render(`users`, { list: diary });
  });
});
router.get(`/new`, (req, res) => {
  res.render(`userForm.ejs`);
});

router.get(`/:id`, (req, res) => {
  let id = req.params.id;
  UserDiary.findById(id, (err, diary) => {
    console.log(err);
    res.render(`singleUser.ejs`, { list: diary });
  });
});

router.post(`/diary`, (req, res) => {
  UserDiary.create(req.body, (err, diary) => {
    console.log(err);
    res.send(`<h1>${diary}</h1>`);
  });
});

module.exports = router;
