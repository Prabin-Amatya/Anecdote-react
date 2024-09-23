import { createSlice } from "@reduxjs/toolkit"
import anecdoteServices from "../services/anecdoteServices"

const anecdoteSlice = createSlice({
    name: 'anecdotes',
    initialState: [],
    reducers:{
        createAnecdote(state, action){
            const new_anecdote = action.payload
            state.push(new_anecdote)
        },
        increaseVote(state, action){
            const noteToChange = state.find(anecdote => anecdote.id == action.payload)
            const changedNote = {...noteToChange, votes: noteToChange.votes + 1}
            const new_state = state.map(anecdote => anecdote.id == changedNote.id? changedNote: anecdote)
            return new_state
        },

        appendAnecdote(state, action){
            state.push(action.payload)
        },

        setAnecdotes(state, action){
            return action.payload
        },
    }
})

export const {createAnecdote, increaseVote, appendAnecdote, setAnecdotes} = anecdoteSlice.actions

export const initializeAnecdotes = () =>{
    return async dispatch => {
        const anecdotes = await anecdoteServices.getAll()
        dispatch(setAnecdotes(anecdotes))
    }
}

export const new_anecdote = (anecdote) =>{
    return async dispatch =>{
        const new_anecdote = await anecdoteServices.createNew(anecdote)
        dispatch(appendAnecdote(new_anecdote))
    }
}

export const increment_vote = (anecdote) =>{
    return async dispatch =>{
        const updated_anecdote = {...anecdote, votes: anecdote.votes+1}
        console.log(updated_anecdote)
        await anecdoteServices.update(anecdote.id, updated_anecdote)
        dispatch(increaseVote(anecdote.id))
    }
}

export default anecdoteSlice.reducer



 