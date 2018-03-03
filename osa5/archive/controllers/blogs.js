const blogsRouter = require('express').Router()
const Blog = require('../database/blog')
const User = require('../database/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1, adult: 1 })

  res.status(200).json(blogs)
})

blogsRouter.post('/', async (req, res) => {
  try {
    let id = req.body.userId
    if (process.env.NODE_ENV === 'production') {
      const decodedToken = jwt.verify(req.token, process.env.SECRET)

      if (!token || !decodedToken.id)
        throw new Error('token missing or invalid')
      id = decodedToken.id
    }

    const user = await User.findById(id)

    const obj = {
      title: req.body.title,
      author: req.body.author || "",
      url: req.body.url,
      likes: req.body.likes || 0,
      user: user._id
    }

    if (!obj.title || !obj.url || !id || !user)
      return res.status(400).end()

    const blog = await new Blog(obj).save()

    user.blogs = user.blogs.concat(blog._id)
    await user.save()
    res.status(201).json(blog)
  } catch (e) {
    res.status(400).end(e.message)
  }
})

blogsRouter.delete('/:id', async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'production') {
      const decodedToken = jwt.verify(req.token, process.env.SECRET)

      if (!token || !decodedToken.id)
        throw new Error('token missing or invalid')

      const blog = Blog.findById(req.params.id)
      if (blog.user.toString() !== decodedToken.id.toString()) 
        throw new Error('invalid token')
    }
    res.status(200).json(await Blog.findByIdAndRemove(req.params.id))
  } catch (e) {
    res.status(400).send(e.message)
  }
})

blogsRouter.put('/:id', async (req, res) => {
  const obj = {
    title: req.body.title,
    author: req.body.author || "",
    url: req.body.url,
    likes: req.body.likes || 0
  }

  if (!obj.title || !obj.url)
    return res.status(400).end()

  try {
    res.status(200).json(await Blog.findByIdAndUpdate(req.params.id, obj, { new: true }))
  } catch (e) {
    res.status(400).end()
  }
})

module.exports = blogsRouter
