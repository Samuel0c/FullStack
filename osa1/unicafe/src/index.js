import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
  return (
    <div>
      <h2>{props.text}</h2>
    </div>
  )
}


const Table = (props) => {
  if (props.state.number_of_feedback === 0) {
    return (
      <div>
        <p>palautetta ei ole vielä annettu</p>
      </div>
    )
  }
  return (
    <table>
      <tbody>
        <Rating state={props.state} text={props.good} how_many={props.state.good_ratings} />
        <Rating state={props.state} text={props.neutral} how_many={props.state.neutral_ratings} />
        <Rating state={props.state} text={props.bad} how_many={props.state.bad_ratings} />
      </tbody>
        <Statistics state={props.state} />
    </table>

  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Rating = (props) => {
  if (props.state.number_of_feedback > 0) {
    return (
      <tr>
        <td>{props.text}</td>
        <td>{props.how_many}</td>
      </tr>
      )
   }
   return (
     <tr></tr>
   )
}

const Statistics = (props) => {
  const average = 'keskiarvo'
  const positives = 'positiivisia'
  return (
    <tbody>
      <Statistic text={average} total={props.state.sum_of_feedback} divider={props.state.number_of_feedback} />
      <Statistic text={positives} total={props.state.number_of_positives} divider={props.state.number_of_feedback} />
    </tbody>
  )
}

const Statistic = (props) => {
  const total = props.total
  const divider = props.divider
  const quotient = total/divider
  return (
    <tr>
      <td>{props.text}</td>
      <td>{quotient}</td>
    </tr>
  )
}


class App extends React.Component {
  constructor(props) {
    super(props)
    this.feedbackHeader = 'anna palautetta'
    this.statsHeader = 'statistiikka'
    this.good = 'hyvä'
    this.neutral = 'neutraali'
    this.bad = 'huono'

    this.state = {
      good_ratings: 0,
      neutral_ratings: 0,
      bad_ratings: 0,
      number_of_feedback: 0,
      sum_of_feedback: 0,
      number_of_positives: 0
    }
  }

  clickGood = () => {
    this.setState({
      good_ratings: this.state.good_ratings + 1
    })
    this.setState({
      number_of_feedback: this.state.number_of_feedback + 1
    })
    this.setState({
      sum_of_feedback: this.state.sum_of_feedback + 1
    })
    this.setState({
      number_of_positives: this.state.number_of_positives + 1
    })
  }

  clickNeutral = () => {
    this.setState({
      neutral_ratings: this.state.neutral_ratings + 1
    })
    this.setState({
      number_of_feedback: this.state.number_of_feedback + 1
    })
  }

  clickBad = () => {
    this.setState({
      bad_ratings: this.state.bad_ratings + 1
    })
    this.setState({
      number_of_feedback: this.state.number_of_feedback + 1
    })
    this.setState({
      sum_of_feedback: this.state.sum_of_feedback - 1
    })
  }

  render() {
    return (
      <div>
        <Header text={this.feedbackHeader} />
        <Button
          handleClick={this.clickGood.bind(this)}
          text={this.good}
        />
        <Button
          handleClick={this.clickNeutral.bind(this)}
          text={this.neutral}
        />
        <Button
          handleClick={this.clickBad.bind(this)}
          text={this.bad}
        />
        <Header text={this.statsHeader} />
        <Table state={this.state} good={this.good} neutral={this.neutral} bad={this.bad} />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
