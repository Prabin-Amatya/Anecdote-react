
import { useDispatch, useSelector} from "react-redux"
import { increaseVote } from "../reducers/anecdoteReducer"

const Anecdote = ({anecdote, handleClick}) =>{
    return(
        <div>
            <span>{anecdote.content}</span><br/>
            Has {anecdote.votes}<button onClick={handleClick}>Vote</button>
        </div>
    )
}

const AnecdoteList = () =>{
    const dispatch = useDispatch()
    const anecdotes = useSelector(state => state).sort((anec1, anec2) => anec2.votes - anec1.votes)
    return (
          <div>
            {anecdotes.map(anecdote => 
                <Anecdote 
                    key={anecdote.id} anecdote = {anecdote}
                    handleClick={()=>dispatch(increaseVote(anecdote.id))}/> 
                
            )}
          </div>
      )
}

export default AnecdoteList