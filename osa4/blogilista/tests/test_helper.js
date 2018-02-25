const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  }
]

const initialUsers = [
    {
        username: "adenine",
        name: "Ada",
        passwordHash: "salainenSana",
        isAdult: true
    },
    {
        username: "thymine",
        name: "Tia",
        passwordHash: "youshallnotpass",
        isAdult: false
    }
]


const formatBlog = (blog) => {
    return {
        id: blog._id,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes
    }
}

const formatUser = (user) => {
    return {
        id: user._id,
        username: user.username,
        name: user.name,
        passwordHash: user.passwordHash,
        isAdult: user.isAdult
    }
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(formatBlog)
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(formatUser)
}

module.exports = {
    initialBlogs, initialUsers, formatBlog, formatUser, blogsInDb, usersInDb
}
