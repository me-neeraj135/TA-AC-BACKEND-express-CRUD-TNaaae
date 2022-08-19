/** @format */

const { default: mongoose } = require("mongoose");
let studentsRoute = require(`./routes/students`);
let indexRoute = require(`./routes/index`);
let express = require(`express`);
let logger = require(`morgan`);
let path = require(`path`);
let ejs = require(`ejs`);

// connect databases
mongoose.connect(`mongodb://localhost/school`, err => {
  console.log(err ? err : `database connected`);
});

let app = express();

app.use(logger(`dev`));

// middleware

app.use(express.json());

// set ejs middleware
app.set(`view engine`, `ejs`);
app.set(`views`, path.join(__dirname, `views`));

// route middleware

app.use(`/`, indexRoute);

app.use(`/students`, studentsRoute);

// error handler middleware

app.use((req, res, next) => {
  res.send(`Page not Found`);
});

app.listen(3000, () => {
  console.log(`server listening on port 3k`);
});
