const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
  title: {
    type: String,
    require: true,
    unique: true,
  },
  link: {
    type: String,
    require: true
  },
  data: {
    type: Date
  },
  comment: {
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }
});

const Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;