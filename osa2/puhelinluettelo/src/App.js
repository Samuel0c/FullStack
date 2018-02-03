import React from 'react';
import Person from './components/Person'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas' }
      ],
      newName: ''
    }
  }

  addName = (event) => {
    event.preventDefault()
    const nameObject = {
      id: this.state.newName,
      name: this.state.newName
    }

    let persons = this.state.persons

    if (!persons.find(p => p.name === nameObject.name))
      persons = this.state.persons.concat(nameObject)

    this.setState({
      persons,
      newName: ''
    })
  }

  handleNameChange = (event) => {
    this.setState({ newName: event.target.value })
  }


  render() {
    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <form onSubmit={this.addName}>
          <div>
            nimi: <input
              value={this.state.newName}
              onChange={this.handleNameChange}
              />
          </div>
          <div>
            <button type="submit">lisää</button>
          </div>
        </form>
        <h2>Numerot</h2>
          <ul>
            {this.state.persons.reduce((acc, cur) => {
              return [...acc, <Person person={cur} key={cur.name}/>]
            }, [])}
          </ul>
      </div>
    )
  }
}

export default App
