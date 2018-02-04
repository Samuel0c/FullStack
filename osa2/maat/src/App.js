import React from 'react';
import axios from 'axios'
import Country from './components/Country'
import CountryInfo from './components/CountryInfo'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      countries: [],
      filter: ''
    }
  }

  componentDidMount() {
    console.log('will mount')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        this.setState({ countries: response.data })
      })
  }

  handleFilterChange = (event) => {
    this.setState({ filter: event.target.value })
  }

  getCountries = () => {
    const filter = this.state.filter.toLowerCase()
    const countriesToShow =
       this.state.countries.filter(country => country.name.toLowerCase().includes(filter))

    if (!filter.length) {
      return <p>'Try applying a filter'</p>
    } else if (countriesToShow.length > 10) {
      return <p>'Too many matches, specify another filter'</p>
    } else if (!countriesToShow.length) {
      return <p>'Could not find any countries that match the filter'</p>
    } else if (countriesToShow.length > 1) {
      const search = (event, filter) => {
        event.preventDefault()
        this.setState({ filter })
      }
      return countriesToShow.map(country =>
        <Country country={country} searchFunction={search}/>)
    } else {
      return <CountryInfo country={countriesToShow[0]} />
    }
  }

  render() {
    return (
      <div>
        <form onChange={this.handleFilterChange}>
          <div>
            find countries:
            <input value= {this.state.filter} />
          </div>
        </form>
        <div>
          {this.getCountries()}
        </div>
      </div>
    );
  }
}

export default App;
