var passport = require('passport');
var User = require('../models/User');

var exports = module.exports = {}


// register email
exports.register = function (req, res) {

  User.register(new User({ username: req.body.username }), req.body.password, function (err, user) {
    if (err) {
      return res.render("register", { info: err });
    }

    passport.authenticate('local')(req, res, function () {
      res.redirect('/');
    });
  });

}

