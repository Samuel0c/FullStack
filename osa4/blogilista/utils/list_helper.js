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

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}
