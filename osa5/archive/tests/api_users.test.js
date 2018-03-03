const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const User = require('../database/user')
const helper = require('./test_helper')

describe('api_users', () => {
    beforeAll(async () => {
        await User.remove({})

        for (const u of helper.initialUsers) {
            await new User(u).save()
        }
    })

    afterAll(() => {
        server.close()
    })
    
    test('all users are returned', async () => {
        const users = await helper.usersInDb() 
        expect(users.length).toBe(helper.initialUsers.length)
    })

    test('users can be getted', async () => {
        await api
            .get('/api/users')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('users can be added', async () => {
        const user = {
            username: "user",
            name: "name strong",
            adult: false,
            password: "pass"
        }

        const usersBefore = await helper.usersInDb()

        await api
            .post('/api/users')
            .send(user)
            .expect(200)

        const usersAfter = await helper.usersInDb()

        expect(usersAfter.length).toBe(usersBefore.length + 1)
        expect(usersAfter.find(u => u.username = user.username)).toBeTruthy()
        expect(usersAfter.find(u => u.username = user.username).adult).toBeTruthy()
    })

    test('users cant be added with too short pass or nonunique name', async () => {
        const user = {
            username: "usname",
            name: "name strong",
            adult: true,
            password: "pa"
        }

        const create = (user) => api.post('/api/users').send(user)

        const notUnique = await create(helper.initialUsers[0]).expect(500).expect('Unique username required')
        const tooShortPass = await create(user).expect(500).expect('Minimum of 3 characters required')
        const okay = await create({...user, password: "pa3"}).expect(200)
    })
})
