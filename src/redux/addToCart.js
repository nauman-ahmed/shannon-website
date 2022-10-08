import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    cartInfo:{}
}



const AddToCart = createSlice({
    name: 'CartInfo',
    initialState,
    reducers: {
        addCart(state,action) {
            state.cartInfo = {...state.cartInfo,[action.payload.key]:action.payload.data}
        },
        emptyCart(state,action){
            state.cartInfo ={}
        },
        removeCartItem(state,action){
            delete state.cartInfo[action.payload] 
        }
    },
   
    
})

// // Action creators are generated for each case reducer function
export const { addCart,emptyCart ,removeCartItem} = AddToCart.actions
export default AddToCart.reducer