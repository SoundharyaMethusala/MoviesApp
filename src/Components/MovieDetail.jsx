import { useParams } from "react-router-dom"
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { BASE_URL } from "../utils/constants";

export default function MovieDetail(){
    const {id}=useParams();
    const [moviedetails,setMoviedetails]=useState(null);
    const [youtubekey,setYoutubeKey]=useState(null);
    const[cast,setCast]=useState([]);

    useEffect(()=>{
        axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=48cc502104e3a8214004e2d847b4ea0b`)
        .then(function(res){
            setMoviedetails(res.data)
            return axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=48cc502104e3a8214004e2d847b4ea0b`)
        }).then(function(res){
            const videos=res.data.results;
            const trailer = videos.find(video => video.type === 'Trailer' && video.site === 'YouTube');
            if (trailer) {
            setYoutubeKey(trailer.key);
            }
            return axios.get(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=48cc502104e3a8214004e2d847b4ea0b`)
            .then(function(res){
                const cast=res.data.cast;
                if(cast){
                    setCast(cast);
                }
            })
        })
    },[id])

    if(!moviedetails){
        return <h1>...Loading</h1>
    }

    return (
        <div className="bg-[black] text-[white] p-12">
            <div className="flex items-center">
                 <div className="flex-1 ml-8">
                    <h1 className="text-3xl font-bold">{moviedetails.title}</h1>
                 </div>
                 <div className="flex items-center justify-end mr-8">
                    <h1 className="text-xl font-semibold"> <i className="fa-solid fa-star text-[gold]"></i>
                        {moviedetails.vote_average}</h1>
                 </div>
            </div>
            <div class="flex gap-8 flex-wrap m-4">
                <img 
                className="h-[20rem] w-[12rem] object-cover m-4 rounded-[2rem]"
                src={BASE_URL+moviedetails.backdrop_path}/>
                <div className="flex-1 m-4 w-[20rem]">
                    <iframe width="700" height="340" 
                    src={`https://www.youtube.com/embed/${youtubekey}`} 
                    allow="autoplay;">
                    </iframe>
                </div>
            </div>
            <div className="flex gap-2">
                <div className="p-8 w-[40rem] m-8">
                    {moviedetails.overview}
                </div>
                <div className="m-8 ml-24 p-5 bg-[yellow] text-[black] text-semibold rounded-[2rem]">
                    <h3 className="m-2">Release Date : {moviedetails.release_date}</h3>
                    <h3 className="m-2">Status : {moviedetails.status}</h3>
                    <h3 className="m-2">Tagline : {moviedetails.tagline}</h3>
                </div>
            </div>
            <div className="m-8 p-8">
                <h1 className="text-4xl p-4 font-bold">Cast</h1>
                 <ul className="flex flex-wrap gap-7 bg-[white] text-[black] text-wrap p-8 rounded-[4rem]">
                    {
                    cast.map((actor)=>(
                        <li key={actor.cast_id}>
                            { actor.profile_path &&
                            (<img 
                                className="w-16 h-16 object-cover rounded-full mr-4"
                                src={BASE_URL+actor.profile_path}/>
                            )}
                            <p>{actor.name}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}