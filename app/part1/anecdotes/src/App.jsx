import { useState } from 'react'
import Header from "./components/Header.jsx";

const App = () => {
    const [selected, setSelected] = useState(0)

    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.',
        'Dinamism is the key to success.',
    ]

    const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0));

    const selectRandomAnecdote = () => {
        const randomIndex = Math.floor(Math.random() * anecdotes.length);
        setSelected(randomIndex);
    }

    const voteAnecdote = () => {
        const copyVotes = [...votes];
        copyVotes[selected] += 1;
        setVotes(copyVotes);
    }

    const indexOfMaxVote = votes.reduce((iMax, x, i, arr) => x > arr[iMax] ? i : iMax, 0);

    return (
        <div>
            <Header text={"Anecdote of the day"}/>
            <div>{anecdotes[selected]}</div>
            <div>has {votes[selected]} votes</div>
            <button onClick={selectRandomAnecdote}>Next anecdotes</button>
            <button onClick={voteAnecdote}>Vote</button>

            <Header text={"Anecdote with most votes"}/>
            <div>{anecdotes[indexOfMaxVote]}</div>
            <div>has {votes[indexOfMaxVote]} votes</div>

        </div>
    )
}

export default App