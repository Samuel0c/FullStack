const http = require('http')
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const blogsRouter = require('./controllers/blogs')

app.use(cors())
app.use(bodyParser.json())
app.use(middleware.logger)
app.use('/api/blogs', blogsRouter)
app.use(middleware.error)

const mongoUrl = 'mongodb://samuel:passwordHere@ds235827.mlab.com:35827/blogit'
mongoose.connect(mongoUrl)
mongoose.Promise = global.Promise

app.listen(process.env.PORT || 3003)
