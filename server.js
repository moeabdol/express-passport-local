const express     = require("express");
const path        = require("path");
const bodyParser  = require("body-parser");
const session     = require("express-session");
const hbs         = require("express-handlebars");
const mongoose    = require("mongoose");
const passport    = require("passport");
const MongoStore  = require("connect-mongo")(session);
const indexRouter = require("./routes");
const usersRouter = require("./routes/users");

const app = express();

// Connect to database
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/express-passport",
  { useMongoClient: true })
  .then(
    () => console.log("Connected to database"),
    err => console.log(err)
  );

// Configure templating engine
app.engine("hbs", hbs({
  extname: "hbs"
}));
app.set("view engine", "hbs");
app.set("views", path.resolve(__dirname, "views"));

// Configure body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure static files
app.use(express.static(path.resolve(__dirname, "public")));

// Configure session
app.use(session({
  secret: "mysupersecret",
  resave: true,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}));

// Configure passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use(indexRouter);
app.use(usersRouter);

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
