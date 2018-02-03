import React from 'react';
import Person from './components/Person'
import Valiotsikko from './components/Valiotsikko'
import Button from './components/Button'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Martti Tienari', number: '040-123456' },
        { name: 'Arto Järvinen', number: '040-123456' },
        { name: 'Lea Kutvonen', number: '040-123456' }
      ],
      newName: '',
      newNumber: '',
      filter: ''
    }
  }

  addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: this.state.newName,
      number: this.state.newNumber
    }

    let persons = this.state.persons

    if (!persons.find(p => p.name === personObject.name))
      persons = this.state.persons.concat(personObject)

    this.setState({
      persons,
      newName: '',
      newNumber: ''
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
