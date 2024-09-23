import { searchAnecdote } from "../reducers/filterReducer"
import { useDispatch } from "react-redux"

const SearchAnecdote = () =>{
    const dispatch = useDispatch()

    const handleSearch = (event) =>{
        const query = event.target.value
        dispatch(searchAnecdote(query))
    }

    return (
        <form>
            Filter:
            <input name="query" onChange={handleSearch}/>
        </form>
    )
}

export default SearchAnecdote