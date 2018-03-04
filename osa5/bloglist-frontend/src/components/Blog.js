import React from 'react'

const Blog = ({blog, onClick}) => (
  <div onClick={onClick} >
    {blog.title} {blog.author}
  </div>  
)

export default Blog