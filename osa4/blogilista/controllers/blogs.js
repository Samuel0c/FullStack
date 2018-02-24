const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs.map(Blog))
})


blogsRouter.post('/', (request, response) => {
  const object = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0
  }
  const blog = new Blog(object)

  if (!blog.title || !blog.url) {
    return response.status(400).end()
  }

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})


module.exports = blogsRouter
