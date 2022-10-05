import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'
import { BASE_URL, logouterArtist } from '../AxiosFunctions/Axiosfunctionality';

// const header = {
//     headers: {
//         'Authorization': `Basic ${JSON.parse(localStorage.getItem("loginDataToken"))?JSON.parse(localStorage.getItem("loginDataToken")).token:""}`,
//         // 'Authorization': `Basic ${JSON.parse(localStorage.getItem("loginDataToken")).token}`,
//         'Content-Type': "multipart/form-data"
//     }
// }

// USER LOGIN API AND SLICE
export const artistImageCreateApi = createAsyncThunk(
    'artist/artistImageDataApi',
    async (userData, thunkAPI) => {
   
        return axios
        .post(BASE_URL+"artistImage/create",userData)
        .then((response) => {
            return response.data})
        .catch((err) =>{
            
            logouterArtist()})
    } 
)


const initialState = {
    message:null,
}

const artistImageCreateSlice = createSlice({
    name: "artistImage",
    initialState,
    reducers: {
        storeUploadedImageResponse: (state, param) => {
            console.log('IMAGE REDUCER',state,param)
        },
    },
    extraReducers: (builder) => {
        builder.addCase(artistImageCreateApi.fulfilled, (action,state) => {
            state = state.payload
            return state
        })
    },
});


const { actions, reducer } = artistImageCreateSlice
export const { storeUploadedImageResponse } = actions;
export default reducer;
