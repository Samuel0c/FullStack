import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import store from './store'
import anecdoteReducer from './reducers/anecdoteReducer'


const render = () => {
  ReactDOM.render(
    <App store={store} />,
    document.getElementById('root')
  )
}

render()
store.subscribe(render)