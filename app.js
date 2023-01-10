const express = require('express');
const { PORT = 3000 } = process.env;
const app = express();
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mestodb');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  avatar: {
    type: String,
    required: true
  }
});

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  link: {
    type: String,
    required: true
  },
  owner: {
    type: mongoose.ObjectId,
    required: true
  },
  likes: {
    type: [mongoose.ObjectId],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('user', userSchema);
module.exports = mongoose.model('card', cardSchema);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
})