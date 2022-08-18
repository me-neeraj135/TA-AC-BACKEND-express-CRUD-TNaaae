/** @format */

const { default: mongoose } = require("mongoose");
let express = require(`express`);
let logger = require(`morgan`);
let path = require(`path`);
let app = express();

mongoose.connect(`mongodb://localhost/school`, err => {
  console.log(err ? err : `database connected `);
});

app.use(logger(`dev`));

// use middleware
app.use(express.json());

// set view engine
app.set("view engine", "ejs");
app.set(`views`, path.join(__dirname, `views`));

// handle routes
app.get(`/`, (req, res) => {
  res.render(`index`);
});

// handle error middleware

app.use((req, res, next) => {
  res.send(`${404} Page not Found`);
});
app.listen(4000, () => {
  console.log(`port listening on 4k`);
});
