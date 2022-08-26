/** @format */

let express = require(`express`);
let logger = require(`morgan`);
let mongoose = require(`mongoose`);
let cookieParser = require(`cookie-parser`);
let userRoute = require(`./routes/user`);
let validate = require(`validator`);

// connect database

mongoose.connect(`mongodb://localhost/userDiaryThree`, err => {
  console.log(err ? err : `database connected`);
});

let app = express();

// middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + `/public`));

// set view engine
app.set(`view engine`, `ejs`);
app.set(`views`, __dirname + `/views`);

app.use(logger(`dev`));
app.use(`/user`, userRoute);

app.use(`/admin`, (req, res, next) => {
  next(`Unauthorized Accessed`);
});

// error 404

app.use(`/`, (req, res) => {
  res.send(`Page not Found`);
});

// custom error (client/server)

app.use((err, req, res, next) => {
  res.send(err);
});

app.listen(5000, () => {
  console.log(`server listening on port 5k`);
});
