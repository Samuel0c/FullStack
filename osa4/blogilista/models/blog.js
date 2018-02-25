const mongoose = require('mongoose')

const Blog = mongoose.model('Blog', {
  title: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  author: String,
  url: String,
  likes: Number
})

module.exports = Blog
