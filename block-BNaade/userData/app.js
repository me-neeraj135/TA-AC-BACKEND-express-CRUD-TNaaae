/** @format */

let express = require(`express`);
let logger = require(`morgan`);
let cookieParser = require(`cookie-parser`);
let mongoose = require(`mongoose`);
let indexRoute = require(`./routes/index`);
let userRoute = require(`./routes/users`);

// connect mongodb

mongoose.connect(`mongodb://localhost/userData`, err => {
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

// add route
app.use(`/`, indexRoute);
app.use(`/users`, userRoute);

app.listen(4000, () => {
  console.log(`server listening on 4k`);
});
