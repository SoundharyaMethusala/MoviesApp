import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import Pagination from "./Pagination";
import MovieCard from "./MovieCard";
import { useContext } from "react";
import {useSelector,useDispatch} from "react-redux"
import MovieContext from "../Context/MovieContext";
import movieMiddleware from "../redux/Movie/movieMiddleware";

import ShimmerMovieCard from "./ShimmerMovieCard";
import { ShimmerTitle } from "react-shimmer-effects";



export default function Movies(){
    const {movies,loading,error} = useSelector((store)=>store.movieState)
    const dispatch=useDispatch();
    
    const {watchlist}=useContext(MovieContext)
    const {pageno}=useSelector((store)=>store.paginationState);

    useEffect(()=>{
        dispatch(movieMiddleware(pageno));
    },[pageno]);
    
    if(loading){
      return(
                <>
                    <ShimmerTitle line={1} className="m-12 ml-[40rem] w-[30rem]"></ShimmerTitle>
                    <div className="flex flex-wrap justify-evenly">
                    {Array.from({ length: 20 }).map((_, index) => (
                        <ShimmerMovieCard key={index} />
                    ))}
                    </div>                    
                </>
            )
    }

    if(error){
        return <h1>Oops!!Error occurred..</h1>
    }
    
    return(
        <>
        <h1 className="text-center m-12 text-4xl">Trending Movies</h1>
        <div className="flex flex-wrap justify-evenly">
           {
                movies.map((movie)=>{
                return(
                    <MovieCard key={movie.id}
                    movie={movie}
                    fav={watchlist.some((movieobj)=>movieobj.id===movie.id)}
                    title={movie.title} 
                    poster={BASE_URL+movie.backdrop_path}/>
                ) 
            })
        }
        </div>
         <Pagination/>
         </>
    );
}