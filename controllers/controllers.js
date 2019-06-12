const db = require("../models")
const axios = require("axios");
const cheerio = require("cheerio");

let expt = module.exports = {}

expt.home = function (req, res) {

  db.Article.find({}).populate("comments").then(function (dataArticle) {
    let viewObj = {
      user: req.user,
      article: dataArticle
    }

    scrape(dataArticle);

    res.render("index", viewObj);

  }).catch(function (err) {
    console.log(err);

  });

}


expt.comment = function (req, res) {

  if (req.user) {
    req.body.user = req.user.username
  }


  db.Comment.create(req.body)
    .then(function (dataComment) {

      return db.Article.findOneAndUpdate({ _id: req.params.id }, { $push: { comments: dataComment._id } }, { new: true });

    })
    .then(function (dataComment) {

      if (req.user) {
        return db.User.findOneAndUpdate({ _id: req.user._id }, { $push: { comments: dataComment._id } }, { new: true });

      }

    })
    .catch(function (err) {
      console.log(err);

    });

}

expt.articles = function (req, res) {

  db.Article.find({})
    .populate("comments")
    .then(function (data) {
      res.json(data);

    })
    .catch(function (err) {
      res.json(err);

    });

}



function scrape(data) {
  let resultsArr = [];

  axios.get("https://www.theonion.com").then(function (response) {
    let $ = cheerio.load(response.data);
    $("article.sqekv3-0").each(function (i, element) {

      let result = {};
      let h1 = $(element).find("h1")
      let href = $(h1).parent("a").attr("href");
      let date = $(element).find("time").attr("datetime");

      result.title = h1.text();
      result.url = href;
      result.date = date;

      compairAndPush(resultsArr, data)
    });
  });
}

function compairAndPush(resultsArr, dataArr) {

  dataArr.forEach(function (dataItem) {
    resultsArr.forEach(function (resultItem) {
      if (dataItem.title !== resultItem.title) {
        db.Article.create(result).then(function (dataArticle) {
          console.log(dataArticle);

        })
        .catch(function (err) {
          console.log(err);

        });

      }
    })
  })

}

