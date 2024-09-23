import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import anecdoteServices from "./services/anecdoteServices"
import NotificationContext, { resetNotification } from "./reducers/notificationReducer"
import { successNotification, errorNotification } from "./reducers/notificationReducer"
import { useContext } from "react"

const App = () => {
  const [notification, notificationDispatcher] = useContext(NotificationContext)

  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: anecdoteServices.getAll,
    refetchOnWindowFocus: false,
    retry: false
  })

  const anecodtes = result.data

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation(
    {
      mutationFn: anecdoteServices.createNew,
      onSuccess: (new_anecdote) =>{
        const anecdotes = queryClient.getQueryData(['anecdotes'])
        queryClient.setQueryData(['anecdotes'], [...anecdotes, new_anecdote])
        notificationDispatcher(successNotification("New Anecdote Added"))
        setTimeout(function(){
          notificationDispatcher(resetNotification())
        }, 3000)
      }
    })

  const increaseVoteMutation = useMutation(
    {
      mutationFn: anecdoteServices.update,
      onSuccess: (new_anecdote) =>{
        const anecdotes = queryClient.getQueryData(['anecdotes'])
        const new_anecdote_list = anecdotes.map(anecdote => anecdote.id === new_anecdote.id? new_anecdote: anecdote)
        queryClient.setQueryData(['anecdotes'], new_anecdote_list)
      },

      onError: (error) => {
        notificationDispatcher(error.response? errorNotification(error.response.data.error): "An Error Occured")
      }
    })

  const addNew = async (event) =>{
    event.preventDefault()
    const new_anecdote  = {
      content: event.target.content.value,
      votes: 0
    }
    newAnecdoteMutation.mutate(new_anecdote)
  }

  const increaseVote = async(id) =>{
    console.log(anecodtes)
    const old_anecdote = anecodtes.find(anecdote => anecdote.id == id)
    const new_anecdote = {...old_anecdote, votes: old_anecdote.votes + 1}
    increaseVoteMutation.mutate(new_anecdote)
  }



  if(result.isLoading)
    return (<div>Loading...</div>)

  if(result.isError)
    return (<div>Service is currently unavailable</div>)

  let notificationStyle = {display: notification? 'block': 'none'}
  
  if(notification.type){
    if(notification.type == 'SUCCESS'){
      notificationStyle = {...notificationStyle, color: 'green'}
    }
    if(notification.type == 'ERROR'){
      notificationStyle = {...notificationStyle, color: 'red'}
    }
  }

  
  return(
    <div>
      <div style={notificationStyle}>
        {notification.message}
      </div>

      <div>
        <h3>Add Anecdote</h3>
        <form onSubmit={addNew}>
          <input name='content'/>
          <button type="submit">create</button>
        </form>
      </div>

      <div>
      <h3>Anecdotes List</h3>
        <ul>
          {anecodtes.map(anecdote => 
              <li key={anecdote.id}>
                <span>
                  {anecdote.content}
                </span>
                <span>
                  {anecdote.votes}
                </span>
                <button onClick={() => increaseVote(anecdote.id)}>
                    Vote
                </button>
              </li>
          )}
        </ul>
      </div>
    </div>
  )

}

export default App