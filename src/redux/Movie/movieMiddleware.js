import movieSlice from "./movieSlice";
import axios from "axios";

const action=movieSlice.actions;

export default function movieMiddleware(pageno){
    
    return async function(dispatch){
        try{
            dispatch(action.setLoading())
            const movie=await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=48cc502104e3a8214004e2d847b4ea0b&page=${pageno}`)
            dispatch(action.setMovies(movie.data.results))
        }
        catch(error){
            dispatch(action.setError());
        }
    }
}