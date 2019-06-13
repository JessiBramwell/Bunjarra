var controller = require("../controllers/controllers.js");
var passport = require('passport');

module.exports = function (app) {

  app.get("/", controller.home);

  app.get("/api/articles", controller.articles);

  app.post("/article/:id", controller.comment);

  app.delete("/comment/:id", controller.delete)

  app.post("/register", controller.register);

  // ASK ABOUT THE BEST WAY TO ORGANIZE THESE FUNCTIONS 


  //login needs to check for verified token, before letting the user log in
  app.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/unauthorized'
  }));

  app.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/');
  });

}