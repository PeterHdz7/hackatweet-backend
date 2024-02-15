const User = require('./users');
const mongoose = require("mongoose");

const tweetSchema = mongoose.Schema({
  date: Date,
  content: String,
  hashtag: String,
  username: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
  },

  likes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
  ],
});

const Tweet = mongoose.model("tweets", tweetSchema);

module.exports = Tweet;
