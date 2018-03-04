import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ login, state, handler }) => (
    <div>
      <h2>Login to application</h2>

      <form onSubmit={login}>
        <div>
          käyttäjätunnus
          <input
            type="text"
            name="username"
            value={state.username}
            onChange={handler}
          />
        </div>
        <div>
          salasana
          <input
            type="password"
            name="password"
            value={state.password}
            onChange={handler}
          />
        </div>
        <button>kirjaudu</button>
      </form>
    </div>
  )

  LoginForm.propTypes = {
    login: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired,
    handler: PropTypes.func.isRequired
  }

  export default LoginForm