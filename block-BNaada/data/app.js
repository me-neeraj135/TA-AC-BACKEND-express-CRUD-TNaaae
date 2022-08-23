/** @format */

let mongoose = require(`mongoose`);
let express = require(`express`);

let logger = require(`morgan`);
let cookieParser = require(`cookie-parser`);

let userRoute = require(`./routes/users`);
let path = require(`path`);

// connect mongodb

mongoose.connect(`mongodb://localhost/userData`, err => {
  console.log(err ? err : `database connected`);
});
let app = express();

// middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + `/public`));
app.use(logger(`dev`));

// set ejs engine
app.set(`views engine`, `ejs`);
app.set(`views`, __dirname + `/views`);

// routes
app.use(`/users`, userRoute);

app.use(`/admin`, (req, res, next) => {
  next(`Unauthorized Accessed`);
});
// error 404

app.use((req, res, next) => {
  res.send(`Page not found`);
});
// custom error (client /server)
app.use((err, req, res, next) => {
  res.send(err);
});
app.listen(8000, () => {
  console.log(`server listening on port 8k`);
});
