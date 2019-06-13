// Dependencies
const express = require("express"),
  expressSession = require("express-session"),
  exphbs = require("express-handlebars"),
  mongoose = require("mongoose"),
  passport = require("passport"),
  LocalStrategy = require('passport-local').Strategy;

const app = express();
const PORT = process.env.PORT || 3000;

// Handlebars
app.engine(".hbs", exphbs({
  defaultLayout: "main",
  extname: ".hbs"
}));
app.set("view engine", ".hbs");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.use(expressSession({
  secret: 'your secret here',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// Configure passport
var User = require('./models/User');

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Mongoose connection
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhostbunjarra";
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });

// Routes
require("./routes/routes.js")(app);

app.listen(PORT, function () {
  console.log(
    "Listening on port %s. http://localhost:%s/",
    PORT,
    PORT
  );
});