import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    division:[]
}



const selectedDivision = createSlice({
    name: 'selectDivision',
    initialState,
    reducers: {
        updateDivision(state,action) {
            state.division = action.payload
        }
    },
   
    
})

// // Action creators are generated for each case reducer function
export const { updateDivision } = selectedDivision.actions
export default selectedDivision.reducer