import './App.css'
import Navbar from './Components/Navbar'
import Movies from './Components/Movies'
import Banner from './Components/Banner'
import Watchlist from './Components/Watchlist'
import { useState,useEffect } from 'react'
import MovieContext from './Context/MovieContext'
import PaginationContext from './Context/PaginationContext'


import { BrowserRouter,Routes,Route } from 'react-router-dom'
import MovieDetail from './Components/MovieDetail'

function App() {

  const [watchlist,setWatchList]=useState(JSON.parse(localStorage.getItem("watchlist")) || []);
  const [pageno,setPageno]=useState(1);
    const addTowatchlist=(movietoadd)=>{
        const newwatchlist=[...watchlist,movietoadd];
        setWatchList(newwatchlist);
        //console.log(newwatchlist);
    }

    const handlenext=()=>{
      setPageno(pageno+1);
  }

  const handleprev=()=>{
      if(pageno>1){
          setPageno(pageno-1);
      }
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
    <MovieContext.Provider value={{watchlist,addTowatchlist,removeFromwatchlist}}>
    <Routes>
        <Route path="/" element={
          <>
          <Banner/>
          <PaginationContext.Provider value={{pageno,handlenext,handleprev}}>
            <Movies/>
          </PaginationContext.Provider>
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
