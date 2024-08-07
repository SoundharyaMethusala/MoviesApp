import { useState,useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from 'axios';
import Pagination from "./Pagination";
import MovieCard from "./MovieCard";
import MovieContext from "../Context/MovieContext";
import { useContext } from "react";
import PaginationContext from "../Context/PaginationContext";

export default function Movies(){
    const [movies,setMovies]=useState(null);
    
    const {watchlist}=useContext(MovieContext)
    const {pageno} = useContext(PaginationContext)

    useEffect(()=>{
        const fetchmovies=async()=>{
            try{
                const movie=await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=48cc502104e3a8214004e2d847b4ea0b&page=${pageno}`)
                setMovies(movie.data.results)
            }
            catch(error){
                console.log("Error fetching trending movies",error);
            }
        }
        fetchmovies();
        
    },[pageno]);

    if(!movies){
        return <h1>...Loading</h1>
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