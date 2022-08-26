/** @format */

let express = require(`express`);
let logger = require(`morgan`);
let mongoose = require(`mongoose`);
let userRoute = require(`./routes/user`);

// connect database

mongoose.connect(`mongodb://localhost/userDiaryTwo`, err => {
  console.log(err ? err : `data base connected`);
});

let app = express();

// middleware

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + `/public`));

// set view engine

app.set(`view engine`, `ejs`);
app.set(`views`, __dirname + `/views`);

// routes
app.use(`/user`, userRoute);

// logger
app.use(logger(`dev`));

app.use(`/admin`, (req, res, next) => {
  next(`Unauthorized Accessed`);
});

// error 404
app.use(`/`, (req, res) => {
  res.send(`Page not Found`);
});

// custom error(client/server)

app.use((err, req, res, next) => {
  res.send(err);
});

app.listen(4000, () => {
  console.log(`server listening on port 4k`);
});
