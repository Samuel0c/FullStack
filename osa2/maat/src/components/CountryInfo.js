import React from 'react'

const CountryInfo = ({ country }) => {
  return (
    <div>
      <h1>{country.name} {country.nativeName}</h1>
      <p>capital: {country.capital}</p>
      <p>population: {country.population}</p>
      <img src={country.flag} alt='flag' height='200'/>
    </div>
  )
}

export default CountryInfo
