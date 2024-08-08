import { createSlice } from "@reduxjs/toolkit";

const movieSlice=createSlice({
    name:"movieSlice",
    initialState:{
        movies:[],
        loading:true,
        error:false
    },
    reducers:{
        setError:(state)=>{
            state.error=true,
            state.loading=false,
            state.movies=[]
        },
        setLoading:(state)=>{
            state.loading=true,
            state.error=false,
            state.movies=[]
        },
        setMovies:(state,descobj)=>{
            state.movies=descobj.payload;
            state.loading=false,
            state.error=false
        }
    }
})

export default movieSlice;