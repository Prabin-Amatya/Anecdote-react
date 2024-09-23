import { useDispatch, useSelector} from "react-redux"
import { notificationSetter } from "../reducers/notificationReducer"
import { increment_vote } from "../reducers/anecdoteReducer"

const Anecdote = ({anecdote, handleClick}) =>{
    return(
        <div>
            <span>{anecdote.content}</span><br/>
            Has {anecdote.votes}<button onClick={() => handleClick(anecdote)}>Vote</button>
        </div>
    )
}

const AnecdoteList = () =>{
    const dispatch = useDispatch()
    const query = useSelector(state => state.filter)
    const immutable_anecdotes = useSelector(state => state.anecdotes)
    const filtered_anecdotes = [...immutable_anecdotes]
                                    .filter(anecdote => anecdote.content.toLowerCase().includes(query))
                                    .sort((anec1, anec2) => anec2.votes - anec1.votes) 

    const handleClick = async (anecdote) =>{

        dispatch(increment_vote(anecdote))

        dispatch(notificationSetter(`You voted for ${anecdote.content}`))

    }
    return (
          <div>
            {filtered_anecdotes.map(anecdote => 
                <Anecdote 
                    key={anecdote.id} anecdote = {anecdote}
                    handleClick={handleClick}/>            
            )}
          </div>
      )
}

export default AnecdoteList