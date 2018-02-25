const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user')

  response.json(blogs)
})


blogsRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)

    response.status(204).end()
  } catch (exception) {
    response.status(400).send({ error: 'malformatted id' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const user = await User.findById(request.body.user)

  const object = {
    title: request.body.title,
    user: user._id,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0
  }

  try {
    await Blog.findByIdAndUpdate(request.params.id, object, { new: true })

    response.status(200).end()
  } catch (exception) {
    response.status(400).send({ error: 'malformatted id' })
  }
})


blogsRouter.post('/', async (request, response) => {
  const user = await User.findById(request.body.user)

  const object = {
    title: request.body.title,
    user: user._id,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0
  }

  if (!object.title || !object.url) {
    return response.status(400).end()
  }

  const blog = new Blog(object)

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})


module.exports = blogsRouter
