import { useDispatch } from "react-redux"
import { createAnecdote, generateId } from "../reducers/anecdoteReducer"

const AnecdoteForm = () =>{
    const dispatch = useDispatch()

    const handleAdd = (event) =>{
        event.preventDefault()
        const new_anecdote = {
          content: event.target.content.value,
          votes: 0,
          id: generateId()
        }
        dispatch(createAnecdote(new_anecdote))
      }

    return (
        <div>
        <h3>Add Anecdotes</h3>
        <form onSubmit={(event) => handleAdd(event)}>
          <input name="content"/>
          <button type="submit">Create</button>
        </form>
      </div>
    )
}

export default AnecdoteForm