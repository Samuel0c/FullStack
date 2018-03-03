const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../database/user')

loginRouter.post('/', async (req, res) => {
    try {
        const err = () => {throw new Error('invalid username or password')}

        const user = await User.findOne({ username: req.body.username })

        if (!user) err()

        const passwordCorrect = await bcrypt.compare(req.body.password, user.passwordHash)

        if (!passwordCorrect) err()

        const userForToken = {
            username: user.username,
            id: user._id
        }

        const token = jwt.sign(userForToken, process.env.SECRET)

        res.status(200).send({ token, username: user.username, name: user.name })
    } catch (e) {
        res.status(401).send(e.message)
    }
})

module.exports = loginRouter
