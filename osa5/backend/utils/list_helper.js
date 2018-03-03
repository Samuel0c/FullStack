const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((prev, cur) => prev.likes || 0 + cur.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((prev, cur) => {
    return (!prev || prev.likes < cur.likes) ? cur : prev
  })
}

const mostBlogs = (blogs) => {
  const authors = {'': 0}
  let authorName = ''

  blogs.forEach(({ author }) => {
    authors[author] = (authors[author] || 0) + 1
    if (authors[author] > authors[authorName])
      authorName = author
  })

  return {
    author: authorName,
    blogs: authors[authorName]
  }
}

const mostLikes = (blogs) => {
  const authors = {'': 0}
  let authorName = ''

  blogs.forEach(({ author, likes }) => {
    authors[author] = (authors[author] || 0) + likes
    if (authors[author] > authors[authorName])
      authorName = author
  })

  return {
    author: authorName,
    votes: authors[authorName]
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}