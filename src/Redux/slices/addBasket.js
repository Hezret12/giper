import { createSlice } from "@reduxjs/toolkit";



const initialState = {
    cart:[],
    count: 0,
    loading: false
}



export const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
       addBasket: (state,action) =>{
        const {imageUrl,name,defaultAvailability,id} = action.payload;
        const item = {
         id: id,
         name: name,
         image:imageUrl,
         price: defaultAvailability.price,
         specialPrice: defaultAvailability.specialPrice,
         total: parseFloat(defaultAvailability.specialPrice ? defaultAvailability.specialPrice : defaultAvailability.price).toFixed(2),
         quantity: 1
        }
        state.cart.push(item)
        state.count = state.count + 1
        return state;
       },

       deleteItem: (state,action) => {
         return{
            ...state,
            cart: state.cart.filter((items)=> items.id !== action.payload),
            count: state.count - 1
             } 
       },

       increment : (state,action) => {
        
        const item = state.cart.find((item) => item.id === action.payload);
        if(item.quantity == 5){
        
        }
        else { item.quantity++
         }
          return state
       },

       decrease : (state,action) =>{
        const item = state.cart.find((item) => item.id === action.payload);
         if( item.quantity == 1) {
            return{
                ...state,
                cart: state.cart.filter((items)=> items.id !== action.payload),
                count: state.count - 1
                 } 
         }
         else {
            item.quantity --
            return state
         }
       }
    }
})

export const { addBasket, increment, decrease , deleteItem } = cartSlice.actions;

export default cartSlice.reducer;