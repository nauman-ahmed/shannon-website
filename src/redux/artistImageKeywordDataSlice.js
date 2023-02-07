import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'
import { BASE_URL } from '../AxiosFunctions/Axiosfunctionality';

export const artistKeyword = createAsyncThunk(
    'artist/ArtistKeywordData', 
    async (payload) => {
        return axios
        .post(BASE_URL+"artistImage/getAllKeyword",payload)
        .then((response) => response.data)
    } 
)

const initialState = {
    artistKeywordImages :[],
    loading:false,
    message:""
}

const ArtistImageKeywordDataSlice = createSlice({
    name: "ArtistImageKeywordData",
    initialState,
    extraReducers: (builder) => {
        builder.addCase(artistKeyword.pending,(state,action)=>{
            state.loading = true;

        })
        builder.addCase(artistKeyword.fulfilled, (state,action) => {
            state.loading = false;
            state.artistKeywordImages = action.payload

        })
        builder.addCase(artistKeyword.rejected, (state,action) => {
            state.loading = false;
            state.message = action.payload
            state.artistKeywordImages =[]
        })
    },
});


export default ArtistImageKeywordDataSlice.reducer;
