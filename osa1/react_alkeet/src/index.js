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
  const osa1 = 'Reactin perusteet'
  const tehtavia1 = 10
  const osa2 = 'Tiedonvälitys propseilla'
  const tehtavia2 = 7
  const osa3 = 'Komponenttien tila'
  const tehtavia3 = 14

  return (
    <div>
      <Otsikko course={kurssi}/>
      <Sisalto part1={osa1} part2={osa2} part3={osa3}
         ex1={tehtavia1} ex2={tehtavia2} ex3={tehtavia3}/>
      <Yhteensa all_exercises={tehtavia1 + tehtavia2 + tehtavia3}/>
    </div>
  )
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
