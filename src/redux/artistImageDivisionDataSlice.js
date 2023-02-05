import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'
import { BASE_URL } from '../AxiosFunctions/Axiosfunctionality';

export const artistDivision = createAsyncThunk(
    'artist/ArtistDivisionData', 
    async (payload) => {
        return axios
        .post(BASE_URL+"artistImage/getAllDivision")
        .then((response) => response.data)
    } 
)

const initialState = {
    artistKeywordImages :[],
    loading:false,
    message:""
}

const ArtistImageDivisionDataSlice = createSlice({
    name: "ArtistImageDivisionData",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(artistDivision.pending,(state,action)=>{
            state.loading = true;

        })
        builder.addCase(artistDivision.fulfilled, (state,action) => {
            state.loading = false;
            state.artistKeywordImages = action.payload

        })
        builder.addCase(artistDivision.rejected, (state,action) => {
            state.loading = false;
            state.message = action.payload
            state.artistKeywordImages =[]
        })
    },
});


export default ArtistImageDivisionDataSlice.reducer;
