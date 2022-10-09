import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'
import { BASE_URL, logouterArtist } from '../AxiosFunctions/Axiosfunctionality';

export const ArtistDataAPI = createAsyncThunk(
    'artist/ArtistDataAPI',
    async (payload) => {
        return axios
        .post(BASE_URL+"artistUser/getAllClient")
        .then((response) => response.data)
    } 
)

const initialState = {
    artistData :[],
    loading:false
}

const ArtistDataSlice = createSlice({
    name: "ArtistData",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(ArtistDataAPI.pending,(state,action)=>{
            state.loading = true;

        })
        builder.addCase(ArtistDataAPI.fulfilled, (state,action) => {
            state.loading = false;
            state.artistData = action.payload

        })
        builder.addCase(ArtistDataAPI.rejected, (state,action) => {
            state.loading = false;
            state.artistData = action.payload
            
        })
    },
});


export default ArtistDataSlice.reducer;
