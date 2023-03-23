import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    cartInfo:{
        messageShow:true,
        count:0
    }
}



const AddToCart = createSlice({
    name: 'CartInfo',
    initialState,
    reducers: {
        addCart(state,action) {
            state.cartInfo = {...state.cartInfo,[action.payload.key]:action.payload.data,count:state.cartInfo.count+1}
        },
        emptyCart(state,action){
            state.cartInfo ={}
        },
        removeCartItem(state,action){
            state.cartInfo = {...state.cartInfo,count:state.cartInfo.count-1}
            delete state.cartInfo[action.payload] 
        },
        saveCartItemMessageKey(state,action){
            state.cartInfo = {...state.cartInfo,messageShow:action.payload.messageShow}
        }
    },
   
    
})

// // Action creators are generated for each case reducer function
export const { addCart, emptyCart ,removeCartItem, saveCartItemMessageKey} = AddToCart.actions
export default AddToCart.reducer