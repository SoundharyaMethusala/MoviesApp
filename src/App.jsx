import './App.css'
import Navbar from './Components/Navbar'
import Movies from './Components/Movies'
import Banner from './Components/Banner'
import Watchlist from './Components/Watchlist'
import { useState,useEffect } from 'react'


import { BrowserRouter,Routes,Route } from 'react-router-dom'
import MovieDetail from './Components/MovieDetail'
import MovieContext from './Context/MovieContext'

function App() {

  const [watchlist,setWatchList]=useState(JSON.parse(localStorage.getItem("watchlist")) || []);
    const addTowatchlist=(movietoadd)=>{
        const newwatchlist=[...watchlist,movietoadd];
        setWatchList(newwatchlist);
        //console.log(newwatchlist);
    }

    const removeFromwatchlist=(movietoremove)=>{
        const filteredwatchlist=watchlist.filter((movieobj)=>{
            return movieobj.id!==movietoremove.id
        });
        setWatchList(filteredwatchlist);
    }

    useEffect(()=>{
        localStorage.setItem("watchlist",JSON.stringify(watchlist));
    },[watchlist])



  return (
    <BrowserRouter>
    <Navbar/>
    <MovieContext.Provider
        value={{ watchlist, addTowatchlist, removeFromwatchlist, setWatchList }}
      >
    <Routes>
        <Route path="/" element={
          <>
          <Banner/>
            <Movies/>
          </>
        }/>
        <Route path="/Watchlist" element={
          <>
            <Watchlist/>
          </>
        }/>
        <Route path="/movie/:id" element={
          <>
            <MovieDetail/>
          </>
        }/>
      </Routes>
      </MovieContext.Provider>
    </BrowserRouter>
  )
}

export default App
