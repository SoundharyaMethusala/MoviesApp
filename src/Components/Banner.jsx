import axios from 'axios';
import { useEffect, useState } from 'react';
import {BASE_URL} from '../utils/constants'
import ShimmerBanner from './ShimmerBanner';

export default function Banner(){
    const [trendingmovie,setTrendingMovie]=useState(null);

    useEffect(()=>{
        const fetchbannermovie=async()=>{
        try{
        const bannermovie=await axios.get('https://api.themoviedb.org/3/trending/movie/day?api_key=48cc502104e3a8214004e2d847b4ea0b')
        let randommovie=bannermovie.data.results[Math.floor(Math.random()*20)];
        setTrendingMovie(randommovie)
        }
        catch(error){
            console.log("Error fetching banner movie",error);
        }
        }
        fetchbannermovie();
    },[]);

    if(!trendingmovie){
        return <ShimmerBanner></ShimmerBanner>
    }

    return(
        <div className="relative">
            <img className="h-[35rem] w-screen object-contain" src={BASE_URL + trendingmovie.backdrop_path}/>
            <p className="absolute bottom-4 translate-x-[-50%] left-[50%] text-4xl text-white object-cover">{trendingmovie.title}</p>
        </div>
    );
}