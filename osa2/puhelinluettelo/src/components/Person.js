import React from 'react'

const Person = ({ person, handleClick }) => {
  return (
    <tr>
      <th>{person.name}</th>
      <th>{person.number}</th>
      <th><button onClick={() => handleClick(person.id)}>Delete</button></th>
    </tr>
  )
}

export default Person
