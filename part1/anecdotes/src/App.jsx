import { useState } from 'react'

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.'
    ]

    const [selected, setSelected] = useState(0)
    const [votes, setVotes] = useState({0: 0, 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0})
    const [max, setMax] = useState(0)

    const getRandom = () => {
        setSelected(Math.floor(Math.random() * anecdotes.length))
    }

    const vote = () => {
        setVotes({...votes, [selected]: votes[selected] + 1})
        if (votes[selected] + 1 > votes[max]) {
            setMax(selected)
        }
    }

    return (
        <div>

            <Anecdotes selected={selected} max={max} anecdotes={anecdotes} votes={votes} getRandom={getRandom} vote={vote}/>

        </div>
    )
}

// Components
const Anecdotes = ({ selected, max, anecdotes, votes, getRandom, vote }) => {
    return(
        <>
            <h1>Anecdote of the day</h1>
            <Anecdote anecdote={anecdotes[selected]} voteCount={votes[selected]}/>
            <Button text="vote" handleClick={vote}/>
            <Button text="next anecdote" handleClick={getRandom}/>
            <h2>Anecdote with most votes</h2>
            <Anecdote anecdote={anecdotes[max]} voteCount={votes[max]}/>
        </>
    )
}

const Anecdote = ({anecdote, voteCount }) => {
    return (
        <p>{anecdote} <br/>has {voteCount} votes</p>
    )
}

const Button = ({text, handleClick}) => {
    return(
        <button onClick={handleClick}>{text}</button>
    )
}


export default App