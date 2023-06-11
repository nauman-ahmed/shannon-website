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
    bipocBannerData:[],
    aboutBannerData:[],
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
            
            let shannon = action.payload.filter((item) => item.pageName == "SHANNON")
            let bipoc = action.payload.filter((item) => item.pageName == "BIPOC")
            let about = action.payload.filter((item) => item.pageName == "ABOUT")

            state.loading = false;
            state.bannerData = shannon
            state.bipocBannerData = bipoc
            state.aboutBannerData = about

        })
        builder.addCase(bannerLoader.rejected, (state,action) => {
            
            let shannon = action.payload.filter((item) => item.pageName == "SHANNON")
            let bipoc = action.payload.filter((item) => item.pageName == "BIPOC")
            let about = action.payload.filter((item) => item.pageName == "ABOUT")

            state.loading = false;
            state.bannerData = shannon
            state.bipocBannerData = bipoc
            state.aboutBannerData = about
            
        })
    },
});



export default BannerImages.reducer;

