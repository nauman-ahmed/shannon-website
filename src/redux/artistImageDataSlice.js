import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'
import { BASE_URL, logouterArtist } from '../AxiosFunctions/Axiosfunctionality';

export const ArtistImageSliceData = createAsyncThunk(
    'artist/ArtistImageData',
    async (payload) => {
        return axios
        .post(BASE_URL+"artistImage/getAllStatusOne")
        .then((response) => response.data)
    } 
)

const initialState = {
    artistImages :[],
    artistImagesCopy :[],
    loading:false,
    message:""
}

const ArtistImageDataSlice = createSlice({
    name: "ArtistImageData",
    initialState,
    reducers: {
        filterImages(state,action) {
            state.cartInfo = {...state.cartInfo,[action.payload.key]:action.payload.data,count:state.cartInfo.count+1}
        }
    },
    extraReducers: (builder) => {
        builder.addCase(ArtistImageSliceData.pending,(state,action)=>{
            state.loading = true;

        })
        builder.addCase(ArtistImageSliceData.fulfilled, (state,action) => {
            state.loading = false;
            state.artistImages = action.payload
            state.artistImagesCopy = action.payload
        })
        builder.addCase(ArtistImageSliceData.rejected, (state,action) => {
            state.loading = false;
            state.message = action.payload
            state.artistImages = []
            state.artistImagesCopy = []
        })
    },
});


export default ArtistImageDataSlice.reducer;
