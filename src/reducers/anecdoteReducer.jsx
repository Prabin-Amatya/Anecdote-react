const initialAnecdotes = [
    {content:'If it hurts, do it more often.', votes: 10, id: 1},
    {content:'Adding manpower to a late software project makes it later!', votes: 10, id: 2},
    {content:'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.', votes: 10, id: 3},
    {content:'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.', votes: 10, id: 4},
    {content:'Premature optimization is the root of all evil.', votes: 10, id: 5},
    {content:'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.', votes: 10, id: 6},
    {content:'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.', votes: 10, id: 7},
    {content:'The only way to go fast, is to go well.', votes: 10, id: 8}
]

const anecdoteReducer = (state = initialAnecdotes, action) => {
    switch (action.type) {
        case 'NEW_ANECDOTE':    
           { 
                const new_state = [...state, action.payload]
                return new_state
           }
        case 'INCREASE_VOTE':
            {
                const noteToChange = state.find(anecdote => anecdote.id == action.payload.id)
                const changedNote = {...noteToChange, votes: noteToChange.votes + 1}
                const new_state = state.map(anecdote => anecdote.id == changedNote.id? changedNote: anecdote)
                return new_state
            }
        default:
            return state
    }
}
export const generateId = () =>{
    const id = Number((Math.random() * 100000).toFixed(0))
    return id
}

export const createAnecdote = (anecdote) =>{
    return {
        type: 'NEW_ANECDOTE',
        payload: anecdote
    }
}

export const increaseVote = (id) =>{
    return {
        type: 'INCREASE_VOTE',
        payload: {id}
    }
}

export default anecdoteReducer
 