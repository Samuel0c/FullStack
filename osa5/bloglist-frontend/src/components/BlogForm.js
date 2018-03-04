import React from 'react'

const BlogForm = ({ state, handler, adder }) => (
    <div>

        <h3>create new</h3>

        <form onSubmit={adder} >
            <div>
                title
          <input
                    type="text"
                    name="title"
                    value={state.title}
                    onChange={handler}
                />
            </div>
            <div>
                author
          <input
                    type="text"
                    name="author"
                    value={state.author}
                    onChange={handler}
                />
            </div>
            <div>
                url
          <input
                    type="text"
                    name="url"
                    value={state.url}
                    onChange={handler}
                />
            </div>
            <button>create</button>
        </form>

    </div>

)

export default BlogForm