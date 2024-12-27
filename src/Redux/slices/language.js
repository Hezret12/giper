import { createSlice } from "@reduxjs/toolkit"



const initialState = {
    language : localStorage.getItem("i18nextLng") ? localStorage.getItem("i18nextLng") : 'tk'
}



export const languageSlice = createSlice({
    name:"language",
    initialState,
    reducers:{
       language: (state,action) =>{
        state.language = action.payload
       }
    }   
})

export const { language } = languageSlice.actions;

export default languageSlice.reducer;