import React from 'react'

const Country = ({ country, searchFunction }) => {
  return (
    <p onClick={(event) => searchFunction(event, country.name)} key={country.numericCode}>
      {country.name}
    </p>
  )
}

export default Country
