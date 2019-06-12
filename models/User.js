var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var UserSchema = new Schema({

  username: {
    type: String,
    trim: true,
    required: "Username is Required"
  },
  password: {
    type: String,
    trim: true,
    // required: "Password is Required",
    validate: [
      function (input) {
        return input.length >= 6;
      },
      "Password should be longer."
    ]
  },
  userCreated: {
    type: Date,
    default: Date.now
  },
  comments: [{
    type: Schema.Types.ObjectId,
    ref: "Comment"
  }]

});

UserSchema.plugin(passportLocalMongoose);

var User = mongoose.model("User", UserSchema)

module.exports = User;