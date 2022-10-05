import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios'
import { BASE_URL, logouterArtist } from '../AxiosFunctions/Axiosfunctionality';




// USER LOGIN API AND SLICE
export const artistImageDataApi = createAsyncThunk(
    'artist/artistImageDataApi',
    async (userData, thunkAPI) => {
        return axios
        .post(BASE_URL+"artistImage/findId",userData)
        .then((response) => response.data)
        .catch((response) => logouterArtist())
    } 
)


const initialState = {
    savedImages:null,
    uploadedImage:null
}

const artistImageSlice = createSlice({
    name: "artistImage",
    initialState,
    reducers: {
        storeUploadedImage: (state, param) => {
            state = {...initialState}
            state["uploadedImage"] = param.payload.value
            return state
        },
    },
    extraReducers: (builder) => {
        builder.addCase(artistImageDataApi.fulfilled, (action,state) => {
            state = state.payload
            return state
        })
    },
});


const { actions, reducer } = artistImageSlice
export const { storeUploadedImage } = actions;
export default reducer;
