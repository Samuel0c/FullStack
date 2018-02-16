const dummy = (blogs) => {
  return 1
}

const totalLikes = (list) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }
  return list.length === 0 ? 0 : list.reduce(reducer, 0)
}

const favoriteBlog = (list) => {
  let faveBlog = list.reduce((fave, blog) => fave.likes > blog.likes ? fave : blog)
  return faveBlog
}

const mostBlogs = (list) => {
  let authors = list.map(blog => blog.author)
  let blogsPerBlogger = authors.reduce((b,c)=>((b[b.findIndex(d=>d.author===c)]||b[b.push({author:c,count:0})-1]).count++,b),[]);
  let mostActiveBlogger = blogsPerBlogger.reduce((mostActive, blogger) => mostActive.blogs > blogger.blogs ? mostActive : blogger)
  return mostActiveBlogger
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs
}
