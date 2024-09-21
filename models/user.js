const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
});

const articleSchema = new mongoose.Schema({
  writerId: {
    type: String,
    required: true,
  },

  writer: {
    type: String,
    required: true,
  },

  title: {
    type: String,
    require: true,
    length: 100,
  },

  body: {
    type: String,
    required: true,
  },

  thumbnail: {
    type: String,
    required: true,
  },
});

const articleModel = mongoose.model("article", articleSchema);

const userModel = mongoose.model("user", userSchema);

module.exports = {
  userModel,
  articleModel,
};
