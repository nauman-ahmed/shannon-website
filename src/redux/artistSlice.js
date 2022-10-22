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
        updateUploadedImage: (state, param) => {
            state = {...initialState}
            state["uploadedImage"] = param.payload
            return state
        },
        storeUploadedImages: (state, param) => {
            state = {...initialState}
            if(state.savedImages){
                state.savedImages = [...state.savedImages,param.payload]
            }else{
                state.savedImages = param.payload
            }
            return state
        },
        resetUploadedImages: (state, param) => {
            console.log('REDUCER',param)
            state = {...initialState}
            state.savedImages = param.payload
            // if(state.savedImages){
            //     state.savedImages = [...state.savedImages,param.payload]
            // }else{
            // }
            return state
        },
    },
    extraReducers: (builder) => {
        builder.addCase(artistImageDataApi.fulfilled, (action,state) => {
            if(state.payload !== 'ERROR'){
                state.savedImages = state.payload[0].mainImage
                return state
            }
        })
    },
});


const { actions, reducer } = artistImageSlice
export const { storeUploadedImages,updateUploadedImage,resetUploadedImages } = actions;
export default reducer;
