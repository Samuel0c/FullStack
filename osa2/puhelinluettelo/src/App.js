import React from 'react';
import axios from 'axios'
import Person from './components/Person'
import Valiotsikko from './components/Valiotsikko'
import Button from './components/Button'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

  componentDidMount() {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        this.setState({ persons: response.data })
      })
  }

  addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: this.state.newName,
      number: this.state.newNumber
    }

    let persons = this.state.persons

    axios.post('http://localhost:3001/persons', personObject)
    .then(response => {
      if (!persons.find(p => p.name === personObject.name)) {
        this.setState({
          persons: this.state.persons.concat(response.data),
          newName: '',
          newNumber: ''
        })
      } else {
        this.setState({
          persons,
          newName: '',
          newNumber: ''
        })
      }
    })

  }

  handleNameChange = (event) => {
    this.setState({ newName: event.target.value })
  }

  handleNumberChange = (event) => {
    this.setState({ newNumber: event.target.value })
  }

  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value })
  }


  render() {
   console.log(this.state.filter);
   const filter = this.state.filter
    const personsToShow =
      this.state.persons.filter(p => filter.length ? p.name.startsWith(filter) : p)

    return (
      <div>
        <h1>Puhelinluettelo</h1>
        <form onChange={this.handleFilterChange}>
          <div>
            rajaa näytettäviä
            <input value={this.state.filter} />
          </div>
        </form>
        <Valiotsikko text={'Lisää uusi'} key={'Lisää uusi'}/>
        <form onSubmit={this.addPerson}>
          <div>
            nimi: <input
              value={this.state.newName}
              onChange={this.handleNameChange}
              />
          </div>
          <div>
            numero: <input
              value={this.state.newNumber}
              onChange={this.handleNumberChange}
            />
          </div>
          <Button text={'lisää'} />
        </form>
        <Valiotsikko text={'Numerot'} key={'Numerot'}/>
          <ul>
            {personsToShow.reduce((acc, cur) => {
              return [...acc, <Person person={cur} key={cur.name}/>]
            }, [])}
          </ul>
      </div>
    )
  }
}

export default App
