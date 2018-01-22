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
  const table = props.kurssin_osat
  let yht = 0
  table.forEach((subpart) => {
    yht += subpart.tehtavia
  })
  return (
    <div>
      <p>yhteensä {yht} tehtävää</p>
    </div>
  )
}

const App = () => {
  const kurssi = {
    nimi: 'Half Stack -sovelluskehitys',
    osat: [
      {
        nimi: 'Reactin perusteet',
        tehtavia: 10
      },
      {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7
      },
      {
        nimi: 'Komponenttien tila',
        tehtavia: 14
      }
    ]
  }

  return (
    <div>
      <Otsikko course={kurssi.nimi} />
      <Sisalto kurssin_osat={kurssi.osat} />
      <Yhteensa kurssin_osat={kurssi.osat} />
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
