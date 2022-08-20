/** @format */

const { json } = require("express");
let express = require(`express`);
let Student = require(`../models/students`);

let router = express.Router();
router.get(`/new`, (req, res) => {
  res.render(`form`);
});

router.post(`/post`, (req, res) => {
  console.log(req.body);
  Student.create(req.body, (err, student) => {
    console.log(err);
    res.send(`<h1>${student.name}</h1><br><h2>${student.email}</h2>`);
  });
});
router.get(`/`, (req, res) => {
  Student.find({}, (err, student) => {
    console.log(err);
    res.render(`students`, { list: student });
    // res.json({ students: student });
  });
});

router.get(`/:id`, (req, res) => {
  let id = req.params.id;
  Student.findById(id, (err, student) => {
    console.log(err);
    res.render(`studentDetail`, { detail: student });
  });
});

// router.put(`/students/update`, (req, res) => {
//   // find the data and update
// });

// router.delete(`/students`, (req, res) => {
//   // find the data and delete
// });

module.exports = router;
