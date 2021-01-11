import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const App = () => {

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClickGood = (newValue) => {
    setGood(newValue)
  }

  const handleClickNeutral = (newValue) => {
    setNeutral(newValue)
  }

  const handleClickBad = (newValue) => {
    setBad(newValue)
  }

  return (
    <div>
      <Title text="give feedback" />
      <Button handleClick={() => handleClickGood(good + 1)} text="Good" />
      <Button handleClick={() => handleClickNeutral(neutral + 1)} text="Neutral" />
      <Button handleClick={() => handleClickBad(bad + 1)} text="Bad" />
      <Title text="statistics" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

const Title = ({text}) => <h1>{text}</h1>
const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>
const Statistic = ({text, value, unit}) => <tr><td>{text}</td><td>{value} {unit}</td></tr>

const Statistics = ({good, neutral, bad}) => {
  // calcs
  const all = good + neutral + bad
  const average = (all)? (good - bad) / all : 0
  const positive = (all)? good * 100 / all : 0
  // I know I could avoid that if statements above
  // But I think this way is more readable than declaring consts inside the if statement below

  if(all){
    return (
      <table>
        <tbody>
          <Statistic text="good" value={good} unit="" />
          <Statistic text="neutral" value={neutral} unit="" />
          <Statistic text="bad" value={bad} unit="" />
          <Statistic text="all" value={all} unit="" />
          <Statistic text="average" value={average} unit="" />
          <Statistic text="positive" value={positive} unit="%" />
        </tbody>
      </table>
    )
  }

  return <div>No feedback given</div>
}

ReactDOM.render(<App />, document.getElementById('root'))
