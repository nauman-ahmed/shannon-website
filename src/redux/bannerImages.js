import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'
import { BASE_URL, logouterArtist } from '../AxiosFunctions/Axiosfunctionality';



// USER LOGIN API AND SLICE
export const bannerLoader = createAsyncThunk(
    'banner/bannerImages',
    async (userData, thunkAPI) => {
        
        return axios
        .post(BASE_URL+"banner/getAll",userData)
        .then((response) => {
            return response.data})
        .catch((err) =>{
            
            logouterArtist()})
    } 
)


const initialState = {
    bannerData:[],
    loading:false,
    message:"",
}

const BannerImages = createSlice({
    name: "artistImage",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(bannerLoader.pending,(state,action)=>{
            state.loading = true;

        })
        builder.addCase(bannerLoader.fulfilled, (state,action) => {
            state.loading = false;
            state.bannerData = action.payload

        })
        builder.addCase(bannerLoader.rejected, (state,action) => {
            state.loading = false;
            state.bannerData = action.payload
            
        })
    },
});



export default BannerImages.reducer;

