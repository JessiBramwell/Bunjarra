var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleSchema = new Schema({
  title: {
    type: String,
    require: true,
    unique: true,
  },
  url: {
    type: String,
    require: true
  },
  date: {
    type: Date
  },
  // image: {
  //   type: String,
  //   require: true
  // },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }]
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;