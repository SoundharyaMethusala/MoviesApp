import {createSlice} from '@reduxjs/toolkit'

const paginationSlice=createSlice({
    name:"paginationSlice",
    initialState:{
        pageno:1
    },
    reducers:{
        handleNext:(state)=>{
            state.pageno +=1;
        },
        handlePrev:(state)=>{
            state.pageno -=1;
        }
    }
})

export default paginationSlice;