import React from 'react'

const BlogView = ({ blog, onClick, addLike, remove, showDelete }) => {
    return (
        <div>
            <p onClick={onClick}>{blog.title} {blog.author}</p>
            <p>{blog.url}</p>
            <p>{blog.likes}<button onClick={addLike}>like</button></p>
            <p>added by {blog.user.name}</p>
            {showDelete && <p><button onClick={remove}>delete</button></p>}
        </div>
    )
}

export default BlogView