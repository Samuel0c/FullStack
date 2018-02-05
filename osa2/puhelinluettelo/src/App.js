import React from 'react';
import './index.css'
import Person from './components/Person'
import Valiotsikko from './components/Valiotsikko'
import SubmitButton from './components/SubmitButton'
import personService from './services/persons'


const Notification = ({ message }) => {
  if (message === '') {
    return null
  }
  return (
    <div className="error">
      {message}
    </div>
  )
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      message: ''
    }
  }

  componentDidMount() {
    personService
      .getAll()
      .then(response => {
        this.setState({persons: response.data})
      })
      console.log(this.state.message);
    this.messageTimeout()
  }

  messageTimeout = () => {
    setTimeout(() => {
      this.setState({message: ''})
    }, 3000)
  }

  addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: this.state.newName,
      number: this.state.newNumber
    }

    let persons = this.state.persons
    const found = persons.find(p => p.name === personObject.name)

    if (!found) {
      personService
        .create(personObject)
        .then(response => {
            this.setState({
              persons: this.state.persons.concat(response.data),
              newName: '',
              newNumber: '',
              message: 'Henkilö lisätty onnistuneesti'
            }, this.messageTimeout)
        })
    } else {
      personService
        .update(found.id, personObject)
        .then(response => {
          console.log(response);
          this.setState({
            persons: this.state.persons.map(p => {
              if (p.id === found.id) {
                return {
                  ...p,
                  number: personObject.number
                }
              } else {
                return p
              }
            }),
            newName: '',
            newNumber: '',
            message: 'Numero päivitetty onnistuneesti'
          }, this.messageTimeout)
        })
    .catch(error => {
        alert(`Henkilö on jo valitettavasti poistettu palvelimelta`)
        this.setState({ persons: this.state.persons.filter(p => p.id !== found.id) })
      })
    }
  }


  deletePerson = (id) => {
    personService
      .remove(id)
      .then(response => {
        console.log('delete person', response);
        this.setState({
          persons: this.state.persons.filter(p => p.id !== id),
          message: 'Henkilö poistettu onnistuneesti'
        }, this.messageTimeout)
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
        <Notification message={this.state.message}/>
        <form onChange={this.handleFilterChange}>
          <div>
            rajaa näytettäviä
            <input value={this.state.filter} />
          </div>
        </form>
        <Valiotsikko text={'Lisää uusi'} key={'Lisää uusi'}/>
        <form onSubmit={this.addPerson}>
          <table>
            <tbody>
              <tr>
                <th>nimi: </th>
                <th>
                  <input
                  value={this.state.newName}
                  onChange={this.handleNameChange}
                  />
                </th>
              </tr>
              <tr>
                <th>numero: </th>
                <th>
                  <input
                  value={this.state.newNumber}
                  onChange={this.handleNumberChange}
                  />
                </th>
              </tr>
            </tbody>
          </table>
          <SubmitButton text={'lisää'} />
        </form>
        <Valiotsikko text={'Numerot'} key={'Numerot'}/>
        <table>
          <tbody>
            {personsToShow.reduce((acc, cur) => {
              return [...acc, <Person person={cur} key={cur.name} handleClick={this.deletePerson}/>]
            }, [])}
          </tbody>
        </table>
      </div>
    )
  }
}

export default App
