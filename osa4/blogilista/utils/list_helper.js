const dummy = (blogs) => {
  return 1
}

const totalLikes = (list) => {
  const reducer = (sum, blog) => {
    return sum + blog.likes
  }
  return list.length === 0 ? 0 : list.reduce(reducer, 0)
}

module.exports = {
  dummy,
  totalLikes
}
