var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var CommentSchema = new Schema({
  message: {
    type: String,
    required: true
  },
  user: {
    type: String,
    required: true,
    default: "anonymous"
  }
});

var Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;