import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'
import { BASE_URL, logouterArtist } from '../AxiosFunctions/Axiosfunctionality';

export const NewestArtistImageSliceData = createAsyncThunk(
    'artist/NewestArtistImageData',
    async (payload) => {
        return axios
        .post(BASE_URL+"artistImage/getAllStatusOneNewest")
        .then((response) => response.data)
    } 
)

const initialState = {
    artistImages :[],
    artistImagesCopy :[],
    loading:false,
    message:""
}

const NewestArtistImageDataSlice = createSlice({
    name: "NewestImageData",
    initialState,
    reducers: {
        filterImages(state,action) {
            state.cartInfo = {...state.cartInfo,[action.payload.key]:action.payload.data,count:state.cartInfo.count+1}
        }
    },
    extraReducers: (builder) => {
        builder.addCase(NewestArtistImageSliceData.pending,(state,action)=>{
            state.loading = true;

        })
        builder.addCase(NewestArtistImageSliceData.fulfilled, (state,action) => {
            state.loading = false;
            state.artistImages = action.payload
            state.artistImagesCopy = action.payload
        })
        builder.addCase(NewestArtistImageSliceData.rejected, (state,action) => {
            state.loading = false;
            state.message = action.payload
            state.artistImages = []
            state.artistImagesCopy = []
        })
    },
});


export default NewestArtistImageDataSlice.reducer;
