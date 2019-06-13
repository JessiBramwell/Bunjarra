const db = require("../models");
var User = require('../models/User'); // Ask about this ***
const axios = require("axios");
const cheerio = require("cheerio");
var passport = require('passport');

let expt = module.exports = {}

// Registr
expt.register = function (req, res) {

  db.User.register(new User({ username: req.body.username }), req.body.password, function (err, user) {
    if (err) {
      return res.render("index", { info: err.message }); // Ask about this ***
    }

    passport.authenticate('local')(req, res, function () {
      res.redirect('/');
    });
  });

}

// Homepage
expt.home = function (req, res) {

  // print articles in by date with comments populated
  db.Article.find({}).sort("-date").populate("comments").then(function (dataArticle) {
    let viewObj = {
      user: req.user,
      article: dataArticle
    }

    // scrape on load
    scrape(dataArticle);

    res.render("index", viewObj);

  }).catch(function (err) {
    console.log(err);

  });

}

// Comment
expt.comment = function (req, res) {

  //if user is signed in
  if (req.user) {
    req.body.user = req.user.username
  }
  console.log(req.body);

  // create a comment
  db.Comment.create(req.body)
    .then(function (dataComment) {
      // update the article with new comment
      return db.Article.findOneAndUpdate({ _id: req.params.id }, { $push: { comments: dataComment._id } }, { new: true });

    })
    .then(function (dataComment) {
      // update the user with new comment
      if (req.user) {
        return db.User.findOneAndUpdate({ _id: req.user._id }, { $push: { comments: dataComment._id } }, { new: true });

      }

    })
    .catch(function (err) {
      console.log(err);

    });

}

// View json of all articles and comments
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

// Delete comment
expt.delete = function (req, res) {
  console.log(req.params.id);

  db.Comment.deleteOne({ _id: req.params.id }, function (err, res) {
    if (err) throw (err);
  })
}

// scrape function that takes current article data as a paramater 
function scrape(data) {
  var resultsArr = [];

  // axios call to theonion.com
  axios.get("https://www.theonion.com").then(function (response) {
    let $ = cheerio.load(response.data);
    // loop through article elements
    $("article.sqekv3-0").each(function (i, element) {

      let result = {};
      let h1 = $(element).find("h1")
      let href = $(h1).parent("a").attr("href");
      let date = $(element).find("time").attr("datetime");

      result.title = h1.text();
      result.url = href;
      result.date = date;

      resultsArr.push(result)
    });
    // compair data from scrape to the current data in the mongo database
    compairAndPush(resultsArr, data) // Ask about this ***
  });
}

// Compair new data to current 
function compairAndPush(resultsArr, dataArr) {

  console.log(resultsArr.length, dataArr.length);

  // if database isn't empty 
  if (dataArr.length !== 0) {

    // loop through database
    dataArr.forEach(function (dataItem) {
      // loop through scraped data
      resultsArr.forEach(function (resultItem) {
        // compair each
        if (dataItem.title !== resultItem.title) {

          // save to database
          db.Article.create(resultItem).then(function (dataArticle) {
            console.log(dataArticle);

          }).catch(function (err) {
            console.log(err);

          });
        }
      });
    });

  } else {
    // if dtabase is empty save all the results from the scrape
    resultsArr.forEach(function (resultItem) {

      db.Article.create(resultItem).then(function (dataArticle) {
        console.log(dataArticle);

      }).catch(function (err) {
        console.log(err);

      });
    });
  }
}
