import AnecdoteList from "./components/AnecdoteList"
import AnecdoteForm from "./components/AnecdoteForm"
import SearchAnecdote from "./components/SearchAnecdote"
import Notification from "./components/Notification"
import { initializeAnecdotes } from "./reducers/anecdoteReducer"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => { 
    dispatch(initializeAnecdotes())
  }, [dispatch])

  return (
    <div> 
      <h3>Anecdotes</h3>
      <SearchAnecdote/>
      <Notification/>
      <AnecdoteForm/>
      <AnecdoteList/>
    </div>
  )

}

export default App