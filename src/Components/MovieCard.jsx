import {useState} from "react"
import MovieContext from "../Context/MovieContext";
import { useContext } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function MovieCard({movie,fav,title,poster}){
    const {removeFromwatchlist,addTowatchlist} = useContext(MovieContext)

    useEffect(()=>{
        axios.get(`https://api.themoviedb.org/3/movie/${movie.id}?api_key=48cc502104e3a8214004e2d847b4ea0b`)
        .then(function(res){
            setDetails(res.data);
        })
    },[movie.id])

    return(
    <Link to={`movie/${movie.id}`}
    className="hover:scale-105 duration-300 cursor-pointer rounded-[1rem] relative m-4 rounded overflow-hidden">
        <img className="h-[20rem] w-[12rem] object-cover" src={poster}/>
        <p className="absolute bottom-2 translate-x-[-50%] left-[50%] text-white">{title}</p>
        <div className="absolute top-2 right-2 bg-white h-8 w-8 flex items-center justify-center rounded-xl opacity-70">
        {fav ? 
        <div onClick={()=>{ return removeFromwatchlist(movie)}}><i class="fa-solid fa-xmark"></i></div> : 
        <div onClick={()=>{ return addTowatchlist(movie)}}><i class="fa-regular fa-face-grin-stars"></i></div>  
        }
        
        </div>
    </Link>
    );
}