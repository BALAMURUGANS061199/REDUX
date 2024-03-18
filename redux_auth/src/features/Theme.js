import { createSlice } from "@reduxjs/toolkit";

const ThemeSlice =createSlice({
    name:'theme',
    initialState:{value:{color:'black'}},
    reducers:{
        changeColor :(state,action)  =>{
            state.value= action.payload;
        }
    }
})

export const {changeColor} = ThemeSlice.actions;
export default ThemeSlice.reducer