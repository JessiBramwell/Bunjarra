var controller = require("../controllers/controllers.js");

module.exports = function (app) {

  app.get("/", controller.home);



}