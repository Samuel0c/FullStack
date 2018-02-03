import React from 'react'

const Kurssi = (props) => {
  return (
    <div>
      <Otsikko course={props.kurssi.nimi} />
      <Sisalto kurssin_osat={props.kurssi.osat} />
      <Yhteensa kurssin_osat={props.kurssi.osat} />
    </div>
  )
}

const Otsikko = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Sisalto = (props) => {
  const table = props.kurssin_osat
  console.log(table);
  const parts = []
  table.forEach((subpart) => {
     parts.push(<Osa part={subpart.nimi} key={subpart.nimi} exercises={subpart.tehtavia} />)
  })
  return parts
}

const Osa = (props) => {
  return (
    <div>
      <p>{props.part} {props.exercises}</p>
    </div>
  )
}

const Yhteensa = (props) => {
  const tasks = props.kurssin_osat.reduce((acc, cur) => {
    return acc + cur.tehtavia
  }, 0)
  return (
    <div>
      <p>yhteensä {tasks} tehtävää</p>
    </div>
  )
}

export default Kurssi
