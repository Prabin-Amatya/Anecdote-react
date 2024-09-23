import { useDispatch } from "react-redux"
import { new_anecdote } from "../reducers/anecdoteReducer"
import { notificationSetter } from "../reducers/notificationReducer"

const AnecdoteForm = () =>{
    const dispatch = useDispatch()

    const handleAdd = async(event) =>{
        event.preventDefault()
        const anecdote = {
          content: event.target.content.value,
          votes: 0
        }
        
        dispatch(new_anecdote(anecdote))

        dispatch(notificationSetter("New Anecdote Added", 3000))
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