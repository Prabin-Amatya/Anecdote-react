
import AnecdoteList from "./components/AnecdoteList"
import AnecdoteForm from "./components/AnecdoteForm"

const App = () => {

  return (
    <div>  
      <h3>Anecdotes</h3>
      <AnecdoteForm/>
      <AnecdoteList/>
    </div>
  )

}

export default App