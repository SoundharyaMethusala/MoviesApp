import {useState} from "react"

export default function MovieCard({movie,fav,addTowatchlist,removeFromwatchlist,title,poster}){
    return(
    <div className="hover:scale-105 duration-300 cursor-pointer rounded-[1rem] relative m-4 rounded overflow-hidden">
        <img className="h-[20rem] w-[12rem] object-cover" src={poster}/>
        <p className="absolute bottom-2 translate-x-[-50%] left-[50%] text-white">{title}</p>
        <div className="absolute top-2 right-2 bg-white h-8 w-8 flex items-center justify-center rounded-xl opacity-70">
        {fav ? 
        <div onClick={()=>{ return removeFromwatchlist(movie)}}><i class="fa-solid fa-xmark"></i></div> : 
        <div onClick={()=>{ return addTowatchlist(movie)}}><i class="fa-regular fa-face-grin-stars"></i></div>  
        }
        
        </div>
    </div>
    );
}