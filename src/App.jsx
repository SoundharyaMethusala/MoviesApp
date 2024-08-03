import './App.css'
import Navbar from './Components/Navbar'
import Movies from './Components/Movies'
import Banner from './Components/Banner'
import Watchlist from './Components/Watchlist'
import { useState,useEffect } from 'react'

import { BrowserRouter,Routes,Route } from 'react-router-dom'

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
      <Routes>
        <Route path="/" element={
          <>
          <Banner/>
          <Movies watchlist={watchlist} addTowatchlist={addTowatchlist} removeFromwatchlist={removeFromwatchlist}/>
          </>
        }/>
        <Route path="/Watchlist" element={
          <>
            <Watchlist movies={watchlist} removeFromwatchlist={removeFromwatchlist} setWatchList={setWatchList}/>
          </>
        }/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
