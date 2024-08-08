import { configureStore } from "@reduxjs/toolkit";
import paginationSlice from "./paginationSlice";
import movieSlice from "./Movie/movieSlice";

const store=configureStore({
    reducer:{
        paginationState:paginationSlice.reducer,
        movieState:movieSlice.reducer
    }
})

export default store;