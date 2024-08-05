import { BASE_URL, GENRE_ID_MAPPING,ALL_GENRES } from "../utils/constants";
import { useState,useEffect } from "react";
import MovieContext from "../Context/MovieContext";
import { useContext } from "react";

export default function Watchlist(){

    const {watchlist:movies,removeFromwatchlist,addTowatchlist} = useContext(MovieContext)

    const [genres,setGenres]=useState([ALL_GENRES]);
    const [selectedGenre,setSelectedGenre]=useState([ALL_GENRES]);
    const [search,setSearch] = useState("");

    useEffect(()=>{
        const genreslist=movies.map((movieobj)=>{
            return GENRE_ID_MAPPING[movieobj.genre_ids[0]]
        });
        const uniquegenres=new Set(genreslist);
        setGenres([ALL_GENRES,...uniquegenres]);
    },[movies]);

    const sortAscending=(key)=>{
        const sortedmovies=[...movies].sort((movieA,movieB)=>{
            return movieA[key]-movieB[key];
        })
        setWatchList(sortedmovies);
    }  

    const sortDescending=(key)=>{
        const sortedmovies=[...movies].sort((movieA,movieB)=>{
            return movieB[key]-movieA[key];
        })
        setWatchList(sortedmovies);
    }
    
    return(
        <div className="flex flex-col items-center justify-center">

        <div className="flex flex-wrap gap-4 w-[90%] my-8 justify-evenly">
            {
                genres.map((genre,index)=>{
                    return <div key={index} 
                    onClick={()=>setSelectedGenre(genre)}
                    className={`h-[3rem] rounded-2xl text-white bg-slate-400 w-[12rem]
                    flex items-center cursor-pointer text-2xl justify-evenly
                    ${genre == selectedGenre ? "bg-blue-400" : ""}
                    `}>{genre}</div>
                })
            }
        </div>
        
        <input value={search} 
        placeholder="Search..." 
        className="rounded-lg h-[2.5rem] p-4 w-[24rem] my-8 text-2xl bg-slate-200 outline-none"
        onChange={(e)=>{return setSearch(e.target.value)}}
        />

        <table className="border rounded-md overflow-hidden w-[90%]">
            <thead className="bg-slate-300 h-[3rem] rounded-lg">
                <tr className="border-2 text-left">
                    <th>Name</th>
                    <th>
                    <i onClick={()=>{return sortAscending("vote_average")}} 
                    className="fa-solid fa-angle-up mr-2 cursor-pointer"></i>
                        Ratings
                    <i onClick={()=>{return sortDescending("vote_average")}} 
                    className="fa-solid fa-angle-down ml-2 cursor-pointer"></i>
                    </th>
                    <th>
                    <i onClick={()=>{return sortAscending("popularity")}}
                     className="fa-solid fa-angle-up mr-2 cursor-pointer"></i>
                        Popularity
                    <i onClick={()=>{return sortDescending("popularity")}} 
                    className="fa-solid fa-angle-down ml-2 cursor-pointer"></i></th>
                    <th>Genre</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    movies.
                    filter((movie)=>{
                        if(selectedGenre==ALL_GENRES){
                            return true;
                        }
                        return selectedGenre===GENRE_ID_MAPPING[movie.genre_ids[0]]
                    })
                    .filter((movie)=>{
                        return movie.title.toLowerCase().includes(search.toLowerCase())
                    })
                    .map((movie)=>{
                        return(
                            <tr key={movie.id} className="border-2 hover:bg-slate-100">
                            <td className="flex gap-8 m-4 items-center">
                                <img className="h-32 w-36 rounded-lg" 
                                src={BASE_URL+movie.backdrop_path} alt="poster"/>
                                {movie.title}
                            </td>
                            <td>{movie.vote_average}</td>
                            <td>{movie.popularity}</td>
                            <td>{GENRE_ID_MAPPING[movie.genre_ids[0]]}</td>
                            <td onClick={()=>removeFromwatchlist(movie)} 
                            className="text-rose-600 cursor-pointer">
                                <i class="fa-solid fa-trash-can"></i>
                            </td>
                        </tr>
                        )
                   })
                }
            </tbody>
        </table>
        </div>
    );
}