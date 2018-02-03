import React from 'react'
import ReactDOM from 'react-dom'

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

const Kurssi = (props) => {
  return (
    <div>
      <Otsikko course={props.kurssi.nimi} />
      <Sisalto kurssin_osat={props.kurssi.osat} />
      <Yhteensa kurssin_osat={props.kurssi.osat} />
    </div>
  )
}

const App = () => {
  const kurssi = {
    nimi: 'Half Stack -sovelluskehitys',
    osat: [
      {
        nimi: 'Reactin perusteet',
        tehtavia: 10,
        id: 1
      },
      {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7,
        id: 2
      },
      {
        nimi: 'Komponenttien tila',
        tehtavia: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Kurssi kurssi={kurssi} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
