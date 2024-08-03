import { useState,useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import axios from 'axios';
import Pagination from "./Pagination";
import MovieCard from "./MovieCard";

export default function Movies({watchlist,addTowatchlist,removeFromwatchlist}){
    const [movies,setMovies]=useState(null);
    const [pageno,setPageno]=useState(1);

    useEffect(()=>{
        axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=48cc502104e3a8214004e2d847b4ea0b&page=${pageno}`).then(function(res){
            setMovies(res.data.results)
        });
    },[pageno]);

    if(!movies){
        return <h1>...Loading</h1>
    }

    const handlenext=()=>{
        setPageno(pageno+1);
    }

    const handleprev=()=>{
        if(pageno>1){
            setPageno(pageno-1);
        }
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
                    addTowatchlist={addTowatchlist}
                    removeFromwatchlist={removeFromwatchlist}
                    title={movie.title} 
                    poster={BASE_URL+movie.backdrop_path}/>
                ) 
            })
        }
        </div>
         <Pagination pageno={pageno} handlenext={handlenext} handleprev={handleprev}/>
         </>
    );
}