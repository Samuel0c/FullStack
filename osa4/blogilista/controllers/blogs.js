const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

/* blogsRouter.get('/:id', async (request, response) => {
  try {
    const blog = await Blog.findById(request.params.id)

    if (blog) {
      response.json(blog)
    } else {
      response.status(404).end()
    }

  } catch (exception) {
    console.log(exception)
    response.status(400).send({ error: 'malformatted id' })
  }
}) */

blogsRouter.delete('/:id', async (request, response) => {
  try {
    await Blog.findByIdAndRemove(request.params.id)

    response.status(204).end()
  } catch (exception) {
    response.status(400).send({ error: 'malformatted id' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const object = {
    title: request.body.title,
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


blogsRouter.post('/', (request, response) => {
  const object = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0
  }
  
  if (!object.title || !object.url) {
    return response.status(400).end()
  }
  const blog = new Blog(object)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
})


module.exports = blogsRouter
