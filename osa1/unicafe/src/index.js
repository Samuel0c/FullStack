import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
  return (
    <div>
      <h2>{props.text}</h2>
    </div>
  )
}

const Rating = (props) => {
  if (props.state.number_of_feedback > 0) {
    return (
      <div>
        <p>{props.text} {props.how_many}</p>
        </div>
      )
   }
   return (
     <div></div>
   )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = (props) => {
  const average = 'keskiarvo'
  const positives = 'positiivisia'
  if (props.state.number_of_feedback === 0) {
    return (
      <div>
        <p>palautetta ei ole vielä annettu</p>
      </div>
    )
  }
  return (
    <div>
      <Statistic text={average} total={props.state.sum_of_feedback} divider={props.state.number_of_feedback} />
      <Statistic text={positives} total={props.state.number_of_positives} divider={props.state.number_of_feedback} />
    </div>
  )
}

const Statistic = (props) => {
  const total = props.total
  const divider = props.divider
  const quotient = total/divider
  return (
    <div>
      <p> {props.text} {quotient} </p>
    </div>
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
        <Rating state={this.state} text={this.good} how_many={this.state.good_ratings} />
        <Rating state={this.state} text={this.neutral} how_many={this.state.neutral_ratings} />
        <Rating state={this.state} text={this.bad} how_many={this.state.bad_ratings} />
        <Statistics state={this.state} />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
