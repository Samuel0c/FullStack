const Blog = require('../database/blog')
const User = require('../database/user')

const initialBlogs = [{
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
    },
    {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
}]

const initialUsers = [{
        username: "asd2323",
        name: "My Name",
        adult: true,
        password: "passwordadmin"
    }, {
        username: "Hobo22",
        name: "Tom bom",
        adult: false,
        password: "admin2323"
}]

const format = (blog) => {
    return blog && {
        id: blog._id,
        title: blog.title,
        author: blog.author,
        url: blog.url,
        likes: blog.likes,
        user: blog.user
    }
}

const formatUsers = (user) => {
    return user && {
        id: user._id,
        username: user.username,
        name: user.name,
        adult: user.adult,
        blogs: user.blogs
    }
}

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(format)
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(formatUsers)
}

const findByTitle = async (title) => {
    return format(await Blog.findOne({title}))
}

module.exports = {
    blogsInDb, format, initialBlogs, findByTitle, usersInDb, initialUsers, formatUsers
}
