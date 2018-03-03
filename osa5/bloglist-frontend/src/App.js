import React from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

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
      user: null
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
      this.setState({user})
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
    try{
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

  render() {

    const loginForm = () => (
      <div>
        <h2>Login to application</h2>

        <form onSubmit={this.login}>
          <div>
            käyttäjätunnus
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <div>
            salasana
            <input
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.handleLoginFieldChange}
            />
          </div>
          <button>kirjaudu</button>
        </form>
      </div>
    )

    const newBlogForm = () => (
      <div>

        <h3>create new</h3>

        <form onSubmit={this.addBlog} >
          <div>
            title
            <input
              type="text"
              name="title"
              value={this.state.title}
              onChange={this.handleBlogChange}
            />
          </div>
          <div>
            author
            <input
              type="text"
              name="author"
              value={this.state.author}
              onChange={this.handleBlogChange}
            />
          </div>
          <div>
            url
            <input
              type="text"
              name="url"
              value={this.state.url}
              onChange={this.handleBlogChange}
            />
          </div>
          <button>create</button>
        </form>

      </div>
    )

    return (
      <div>

        <Notification message={this.state.error} />

        {this.state.user === null ?
          loginForm() :
          <div>

            <h2>Blogs</h2>

            <div >
              <p>{this.state.user.name} logged in<button onClick={this.logout}>logout</button></p>
            </div>

            <div>
              {this.state.blogs.map(blog =>
                <Blog key={blog._id} blog={blog} />
              )}
            </div>

            <div>
              {newBlogForm()}
            </div>

          </div>
        }


      </div>
    )

  }
}

export default App;
