const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../database/blog')
const helper = require('./test_helper')

describe('api_blogs', () => {
    beforeAll(async () => {
        await Blog.remove({})

        for (const b of helper.initialBlogs) {
            await new Blog(b).save()
        }
    })

    afterAll(() => {
        server.close()
    })

    test('blogs can be get', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
        const blogsDb = await helper.blogsInDb()
        expect(blogsDb.length).toBe(helper.initialBlogs.length)
    })

    test('a blog can be added', async () => {
        const blog = {
            title: "Tajukankaan kutoja",
            author: "Uusitalo",
            url: "http://tajukankaankutoja.sarjakuvablogit.com/",
            userId: (await helper.usersInDb())[0].id
        }

        const blogsBefore = await helper.blogsInDb()

        await api
            .post('/api/blogs')
            .send(blog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAfter = await helper.blogsInDb()

        expect(blogsAfter.length).toBe(blogsBefore.length + 1)
        expect(blogsAfter.map(b => b.title)).toContain(blog.title)
    })

    test('saved blog with missing likes will default to 0', async () => {
        const blog = {
            title: "asd224",
            author: "asd",
            url: "http",
            userId: (await helper.usersInDb())[0].id
        }

        await api
            .post('/api/blogs')
            .send(blog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const added = await helper.findByTitle(blog.title)
        expect(added.likes).toBe(0)
    })

    test('blog without title or url missing will 400', async () => {
        const blog = {
            title: "asd22",
            author: "asd",
            userId: (await helper.usersInDb())[0].id
        }

        await api
            .post('/api/blogs')
            .send(blog)
            .expect(400)

        blog.url = "http"

        await api
            .post('/api/blogs')
            .send(blog)
            .expect(201)

        delete blog.title

        await api
            .post('/api/blogs')
            .send(blog)
            .expect(400)
    })

    test('a blog can be deleted', async () => {
        const blog = {
            title: "MotherTitle",
            author: "Hobo true",
            url: "http",
            userId: (await helper.usersInDb())[0].id
        }

        await api
            .post('/api/blogs')
            .send(blog)
            .expect(201)

        let id = (await helper.findByTitle(blog.title)).id

        await api.delete("/api/blogs/" + id)
            .expect(200)

        const existsAfter = await helper.findByTitle(blog.title) != null

        expect(id).toBeTruthy()
        expect(existsAfter).toBe(false)
    })

    test('a blog can be updated', async () => {
        const blog = {
            title: "titleVeryGood",
            author: "oldauth123",
            url: "http",
            likes: 0,
            userId: (await helper.usersInDb())[0].id
        }

        const id = (await api
            .post('/api/blogs')
            .send(blog)
            .expect(201)).body._id

        blog.author = "NewAuth"

        await api.put('/api/blogs/' + id)
            .send(blog)
            .expect(200)

        const modified = await helper.findByTitle(blog.title)
        delete modified.id
        modified.userId = modified.user
        delete modified.user
        expect(modified).toEqual(blog)
    })
})
