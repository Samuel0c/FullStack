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
  return (
    <div>
      <Osa part={props.part1} exercises={props.ex1}/>
      <Osa part={props.part2} exercises={props.ex2}/>
      <Osa part={props.part3} exercises={props.ex3}/>
    </div>
  )
}

const Osa = (props) => {
  return (
    <div>
      <p>{props.part} {props.exercises}</p>
    </div>
  )
}

const Yhteensa = (props) => {
  return (
    <div>
      <p>yhteensä {props.all_exercises} tehtävää</p>
    </div>
  )
}

const App = () => {
  const kurssi = 'Half Stack -sovelluskehitys'
  const osa1 = {
    nimi: 'Reactin perusteet',
    tehtavia: 10
  }
  const osa2 = {
    nimi: 'Tiedonvälitys propseilla',
    tehtavia: 7
  }
  const osa3 = {
    nimi: 'Komponenttien tila',
    tehtavia: 14
  }

  return (
    <div>
      <h1> {kurssi} </h1>
      <p> {osa1.nimi} {osa1.tehtavia} </p>
      <p> {osa2.nimi} {osa2.tehtavia} </p>
      <p> {osa3.nimi} {osa3.tehtavia} </p>
      <p> yhteensä {osa1.tehtavia + osa2.tehtavia + osa3.tehtavia} tehtävää </p>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
