import React from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Toggable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogView from './components/BlogView';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      title: '',
      author: '',
      url: '',
      showAll: true,
      error: null,
      username: '',
      password: '',
      user: null,
      blogView: null
    }
  }

  componentWillMount() {
    blogService
      .getAll()
      .then(blogs => {
        this.setState({ blogs })
      })
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      this.setState({ user })
      blogService.setToken(user.token)
    }
  }

  toggleVisible = () => {
    this.setState({ showAll: !this.state.showAll })
  }

  addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url
    }
    blogService
      .create(blogObject)
      .then(newBlog => {
        this.setState({
          blogs: this.state.blogs.concat(newBlog),
          title: '',
          author: '',
          url: ''
        })
      })

    this.setState({
      error: 'uusi blogi lisätty onnistuneesti',
    })
    setTimeout(() => {
      this.setState({ error: null })
    }, 5000)
  }

  handleBlogChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  login = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user })

      this.setState({
        error: 'kirjautuminen onnistui',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    } catch (exception) {
      this.setState({
        error: 'käyttäjätunnus tai salasana virheellinen',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  logout = (event) => {
    event.preventDefault()
    try {
      blogService.setToken(null)
      window.localStorage.removeItem('loggedBlogappUser')
      this.setState({ user: null })
      this.setState({
        error: 'uloskirjautuminen onnistui',
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    } catch (exception) {
      console.log(exception)
    }
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  handleBlogClick = (blog) => {
    this.setState({ blogView: blog })
  }

  addLikes = async () => {
    try {
      const blog = this.state.blogView
      const updatedBlog = {...blog, likes: blog.likes + 1}
      this.setState({ blogView: updatedBlog })
      await blogService.update(blog._id, updatedBlog)
      this.setState({ blogs: this.state.blogs.map(b => b._id === updatedBlog._id ? updatedBlog : b) })
    } catch (exception) {
      console.log(exception)
    }
  }

  removeBlog = async () => {
    try {
      const blog = this.state.blogView
      if(window.confirm('Delete ' + blog.title + '?')) {
        await blogService.remove(blog._id)
        this.setState({blogs: this.state.blogs.filter(b => b._id !== blog._id)})
        this.setState({blogView : null})
      }
    } catch (exception) {
      console.log(exception)
    }
  }


  render() {

    return (
      <div>

        <Notification message={this.state.error} />

        {this.state.user === null ?
          <LoginForm login={this.login} state={this.state} handler={this.handleLoginFieldChange} /> :
          <div>
            {this.state.blogView !== null ?
              <BlogView blog={this.state.blogView} onClick={() => this.handleBlogClick(null)} 
                        addLike={this.addLikes} remove={this.removeBlog}
                        showDelete={!this.state.blogView.user || this.state.user.username === this.state.blogView.user.username} /> :
              <div>
                <h2>Blogs</h2>

                <div >
                  <p>{this.state.user.name} logged in<button onClick={this.logout}>logout</button></p>
                </div>

                <div>
                  {this.state.blogs.sort((a, b) => b.likes - a.likes).map(blog =>
                    <Blog key={blog._id} blog={blog} onClick={() => this.handleBlogClick(blog)} />
                  )}
                </div>

                <div>
                  <Togglable buttonLabel="new blog">
                    <BlogForm state={this.state} handler={this.handleBlogChange} adder={this.addBlog} />
                  </Togglable>
                </div>

              </div>
            }

          </div>
        }
      </div>
    )

  }
}

export default App;
