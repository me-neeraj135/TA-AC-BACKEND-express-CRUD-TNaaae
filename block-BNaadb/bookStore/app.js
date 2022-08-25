/** @format */

let cookieParser = require(`cookie-parser`);
let bookRoute = require(`./routes/books`);
let Book = require(`./models/book`);
let mongoose = require(`mongoose`);
let express = require(`express`);
let logger = require(`morgan`);

// connect with database

mongoose.connect(`mongodb://localhost/bookStore`, err => {
  console.log(err ? err : `database connected`);
});

let app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + `/public`));

// set view engine

app.set(`view engine`, `ejs`);
app.set(`views`, __dirname + `/views`);

// route

app.use(`/books`, bookRoute);

app.use(logger(`dev`));
app.use(`/admin`, (req, res, next) => {
  next(`Unauthorized Accessed`);
});

// 404 error
app.use(`/`, (err, res) => {
  res.send(`Page not Found`);
});
// custom error
app.use((err, req, res, next) => {
  res.send(err);
});

app.listen(4000, () => {
  console.log(`server listening on port 4k`);
});
