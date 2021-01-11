import React, {useState} from 'react'
import ReactDOM from 'react-dom'

const App = ({anecdotes}) => {

  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(new Array(anecdotes.length+1).join('0').split('').map(parseFloat))
  const [mostVotedIndex, setMostVotedIndex] = useState(-1)
  const [mostVotedPoints, setMostVotedPoints] = useState(0)

  const handleClickNextAnecdote = () => {
    setSelected(randomIndex(anecdotes.length))
  }

  const handleClickVote = (index) => {
    const newPoints = [...points]
    newPoints[index]++
    setPoints(newPoints)

    if(newPoints[index] > mostVotedPoints){
      setMostVotedPoints(newPoints[index])
      setMostVotedIndex(index)
    }

  }

  return (
    <div>
      <Section title="Anecdote of the day" anecdoteIndex={selected} anecdotes={anecdotes} points={points} />
      <Button text="vote" handleClick={() => handleClickVote(selected)} />
      <Button text="next anecdote" handleClick={() => handleClickNextAnecdote()} />
      <Section title="Anecdote with most votes" anecdoteIndex={mostVotedIndex} anecdotes={anecdotes} points={points} />
    </div>
  )
}

const Section = ({title, anecdoteIndex, anecdotes, points}) => {
  if(anecdoteIndex > -1){
    return (
      <>
      <h1>{title}</h1>
      <Anecdote text={anecdotes[anecdoteIndex]} votes={points[anecdoteIndex]} />
      </>
    )
  }

  return (
    <>
      <p>No votes yet</p>
    </>
  )
}

const Anecdote = ({text, votes}) => (
    <div>
      <div>{text}</div>
      <div>has {votes} votes</div>
    </div>
)

const Button = ({text, handleClick}) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}
const randomIndex = (arraylength) => Math.floor(Math.random() * arraylength)
const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]
ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'))
