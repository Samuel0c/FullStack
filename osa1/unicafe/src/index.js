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
  return (
    <div>
      <p>{props.text} {props.how_many}</p>
    </div>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)


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
      bad_ratings: 0
    }
  }

  clickGood = () => {
    this.setState({
      good_ratings: this.state.good_ratings + 1
    })
  }

  clickNeutral = () => {
    this.setState({
      neutral_ratings: this.state.neutral_ratings + 1
    })
  }

  clickBad = () => {
    this.setState({
      bad_ratings: this.state.bad_ratings + 1
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
        <Rating text={this.good} how_many={this.state.good_ratings} />
        <Rating text={this.neutral} how_many={this.state.neutral_ratings} />
        <Rating text={this.bad} how_many={this.state.bad_ratings} />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
