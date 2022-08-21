/** @format */

let express = require(`express`);
let logger = require(`morgan`);
let mongoose = require(`mongoose`);
let path = require(`path`);
let userRouter = require(`./routes/user`);
let indexRouter = require(`./routes/index`);

// connect mongodb

mongoose.connect(`mongodb://localhost/user`, err => {
  console.log(err ? err : `database connected`);
});

let app = express();
app.use(logger(`dev`));

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + `/public/css`));

// set ejs engine

app.set(`views`, `ejs`);
app.set(`views`, path.join(__dirname, `views`));

// custom error handler
app.use(`/admin`, (req, res, next) => {
  next(`Unauthorized access`);
});
// router middleware
app.use(`/user`, userRouter);
app.use(`/index`, indexRouter);

// 404 error

app.use((req, res, next) => {
  res.send(`Page not Found`);
});
// custom error

app.use((err, req, res, next) => {
  res.send(err);
});

app.listen(4000, () => {
  console.log(`server listening on port 4k`);
});
