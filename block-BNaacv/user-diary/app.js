/** @format */

let express = require(`express`);
let logger = require(`morgan`);
let cookieParser = require(`cookie-parser`);
let mongoose = require(`mongoose`);
let path = require(`path`);
let userRout = require(`./routes/user`);

// connect to database
mongoose.connect(`mongodb://localhost/userDiary`, err => {
  console.log(err ? err : `database connected`);
});

let app = express();
app.use(logger(`dev`));

// set middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

// set ejs engine

app.set(`view engine`, `ejs`);
app.set(`views`, path.join(__dirname, `views`));

// routes middleware

app.use(`/user`, userRout);

// custom error handler
app.use(`/admin`, (req, res, next) => {
  next(`Unauthorized access`);
});

// error handler

app.use((req, res, next) => {
  res.send(`<h1>${404} Page not Found</h1>`);
});
app.use((err, req, res, next) => {
  res.send(`<h1>${err}</h1>`);
});
app.listen(4000, () => {
  console.log(`server listening on port 4k`);
});
