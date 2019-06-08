// Dependencies
require("dotenv").config();
const express = require("express");
const exphbs = require("express-handlebars");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

mongoose.connect("mongodb://localhost/banjarra", { useNewUrlParser: true });

// Handlebars
app.engine(".hbs", exphbs({ 
  defaultLayout: "main",
  extname: ".hbs"
}));
app.set("view engine", ".hbs");

// Routes
require("./routes/routes.js")(app);

app.listen(PORT, function () {
  console.log(
    "Listening on port %s. http://localhost:%s/",
    PORT,
    PORT
  );
});