import { configureStore } from "@reduxjs/toolkit";
import languageSlice  from "./slices/language";
import  cartSlice  from "./slices/addBasket";


export const store = configureStore({
  reducer: {
   language: languageSlice,
   cart: cartSlice
  }
});