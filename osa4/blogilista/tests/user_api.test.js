const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./test_helper')

beforeAll(async () => {
    await User.remove({})
  
    const userObjects = helper.initialUsers.map(user => new User(user))
    const promiseArray = userObjects.map(user => user.save())
    await Promise.all(promiseArray)
  })

test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all users are returned', async () => {
    const users = await helper.usersInDb()
    const initUsers = helper.initialUsers
  
    expect(users.length).toBe(initUsers.length)
  })
  
  test('a specific user is within the returned blogs', async () => {
    const users = await helper.usersInDb()
  
    expect(users.map(u => u.username)).toContain('thymine')
  })

  test('a valid user can be added ', async () => {
    const newUser = {
        username: "guanine",
        name: "Gabriel",
        password: "passpass",
        isAdult: true
    }
  
    const usersBefore = await helper.usersInDb()
  
    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    const usersAfter = await helper.usersInDb()
  
    expect(usersAfter.length).toBe(usersBefore.length + 1)
    expect(usersAfter.map(u => u.username)).toContain(newUser.username)
  })

  test('only unique users can be added ', async () => {
    const newUser = {
        username: "uracil",
        name: "Ulla",
        password: "passport",
        isAdult: true
    }
  
    const usersBefore = await helper.usersInDb()
  
    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
    
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  
    const usersAfter = await helper.usersInDb()
  
    expect(usersAfter.length).toBe(usersBefore.length + 1)
  })

  test('user must have password that consists of at least 3 characters ', async () => {
    const newUser = {
        username: "pyruvate",
        name: "Pyry",
        password: "ei",
        isAdult: false
    }
  
    const usersBefore = await helper.usersInDb()
  
    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  
    const usersAfter = await helper.usersInDb()
  
    expect(usersAfter.length).toBe(usersBefore.length)
    expect(usersAfter.map(u => u.username)).not.toContain(newUser.username)
  })

  test('user is an adult by default ', async () => {
    const newUser = {
        username: "adenosinetriphosphate",
        name: "Adele",
        password: "energiaa"
    }
  
    const usersBefore = await helper.usersInDb()
  
    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
  
    const usersAfter = await helper.usersInDb()
  
    expect(usersAfter.length).toBe(usersBefore.length + 1)
    expect(usersAfter.map(u => u.username)).toContain(newUser.username)
  })

  afterAll(() => {
    server.close()
  })