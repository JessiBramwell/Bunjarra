const db = require("../models")
const axios = require("axios");
const cheerio = require("cheerio");

var exports = module.exports = {}

exports.home = function (req, res) {

  axios.get("https://www.theonion.com").then(function (response) {
    let $ = cheerio.load(response.data);

    $("article.sqekv3-0").each(function (i, element) {
      let result = {};
      var h1 = $(this).find("h1")
      var date = $(this).find("time").attr("datetime");
      var href = $(h1).parent("a").attr("href");

      result.title = h1.text();
      result.link = href;
      result.date = date;

      // db.Article.create(result).then(function (dataArticle) {
      //   console.log(dataArticle);

      // })
      // .catch(function(err) {
      //   console.log(err);

      // });
    });
  });

  res.render("index")
}

exports.comment = function (req, res) {


}

