const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')

beforeAll(async () => {
  await Blog.remove({})

  const blogObjects = helper.initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

test('blogs are returned as json', async () => {

  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const blogs = await helper.blogsInDb()
  const initBlogs = helper.initialBlogs

  expect(blogs.length).toBe(initBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const blogs = await helper.blogsInDb()

  expect(blogs.map(t => t.title)).toContain('Go To Statement Considered Harmful')
})

test('a valid blog can be added ', async () => {
  const newBlog = {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0
  }

  const blogsBefore = await helper.blogsInDb()

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAfter = await helper.blogsInDb()

  expect(blogsAfter.length).toBe(blogsBefore.length + 1)
  expect(blogsAfter.map(b => b.title)).toContain(newBlog.title)
})

test('a blog with undefined likes has defaults zero likes ', async () => {
  const newBlog = {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    __v: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api
    .get('/api/blogs')

  const newlyAdded = response.body.find(a => a.title == 'First class tests')

  expect(newlyAdded.likes).toBe(0)
})

test('a blog without title cannot be added ', async () => {
  const newBlog = {
    author: "Jiipu Ivaneva",
    url: "http://tajukankaankutoja.sarjakuvablogit.com/",
    likes: 10,
    __v: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('a blog without url cannot be added ', async () => {
  const newBlog = {
    title: "Susi sorakuopassa",
    author: "Wolf Kankare",
    likes: 9,
    __v: 0
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('a blog can be deleted', async () => {
  const newBlog = {
    title: "Chocochili",
    author: "Elina Innanen",
    url:"https://chocochili.net/",
    likes: 9,
    __v: 0
  }

  const addedBlog = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  const blogsBefore = await helper.blogsInDb()  

  await api
    .delete(`/api/blogs/${addedBlog.body._id}`)
    .expect(204)

  const blogsAfter = await helper.blogsInDb()

  expect(blogsAfter.map(b => b.title)).not.toContain('Chocochili')
  expect(blogsAfter.length).toBe(blogsBefore.length - 1)
})

test('a blog can be updated', async () => {
  const newBlog = {
    title: "Viimeinen muru",
    author: "Saara",
    url:"https://www.viimeistamuruamyoten.com/",
    likes: 8,
    __v: 0
  }

  const addedBlog = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)

  const blogsBefore = await helper.blogsInDb()  

  newBlog.title = "Viimeistä murua myöten"

  await api
    .put(`/api/blogs/${addedBlog.body._id}`)
    .send(newBlog)
    .expect(200)

  const blogsAfter = await helper.blogsInDb()

  expect(blogsAfter.map(b => b.title)).not.toContain('Viimeinen muru')
  expect(blogsAfter.map(b => b.title)).toContain('Viimeistä murua myöten')
  expect(blogsAfter.length).toBe(blogsBefore.length)
})

afterAll(() => {
  server.close()
})
