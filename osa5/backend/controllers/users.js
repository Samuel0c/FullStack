const usersRouter = require('express').Router()
const User = require('../database/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (req, res) => {
    const users = await User.find({})
        .populate('blogs')

    res.status(200).json(users)
})

usersRouter.post('/', async (req, res) => {
    try {
        const user = {
            username: req.body.username,
            name: req.body.name,
            adult: req.body.adult || true,
            blogs: []
        }, password = req.body.password

        if (!password || password.length < 3) throw new Error('Minimum of 3 characters required')
        
        if (await User.findOne({ username: user.username })) throw new Error('Unique username required')

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(password, saltRounds)

        const savedUser = await new User({
            ...user,
            passwordHash
        }).save()

        res.status(200).json(savedUser)
    } catch (e) {
        res.status(500).send(e.message)
    }
})

module.exports = usersRouter
