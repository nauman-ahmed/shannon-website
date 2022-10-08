import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    message:"",
    open:false
}



const messageLoader = createSlice({
    name: 'message',
    initialState,
    reducers: {
        updateMessage(state,action) {
            state.message = action.payload
        },
        updateOpen(state,action){
            state.open = action.payload;
        }
    },
   
    
})

// // Action creators are generated for each case reducer function
export const { updateMessage,updateOpen } = messageLoader.actions
export default messageLoader.reducer