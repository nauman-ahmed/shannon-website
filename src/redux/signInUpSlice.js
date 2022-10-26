import {
    createSlice,
    createAsyncThunk
} from '@reduxjs/toolkit';
import axios from 'axios'
import {
    BASE_URL, logouterArtist
} from '../AxiosFunctions/Axiosfunctionality';

// USER LOGIN API AND SLICE
export const userLoginApi = createAsyncThunk(
    'users/userLoginApi',
    async (userData, thunkAPI) => {
        return axios
            .post(BASE_URL + "artistUser/login", userData)
            .then((response) => {
                return response.data
            })
            .catch((response) => {logouterArtist();})
    }
)


// USER REGISTER API AND SLICE
export const userRegisterApi = createAsyncThunk(
    'users/userRegisterApi',
    async (userData, thunkAPI) => {
        return axios 
            .post(BASE_URL + "artistUser/register", userData)
            .then((response) => response.data)
            .catch((response) => logouterArtist())
    }
)


const initialState = {
    message: "",
    token: null
}

const userRegisterSlice = createSlice({
    name: "location",
    initialState,
    reducers: {
        registerDataResponse: (state, param) => {
            console.log('REDUCERS', state, param)
        },
        loginDataResponse: (state, param) => {
            console.log('REDUCERS', state, param)
        },
    },
    extraReducers: (builder) => {
        builder.addCase(userRegisterApi.fulfilled, (action, state) => {
            state = state.payload
            return state
        })
        builder.addCase(userLoginApi.fulfilled, (action, state) => {
            state = state.payload
            state['message'] = "login"
            return state
        })
        builder.addCase(userLoginApi.rejected,(state)=>{
            state.message = ""
            state.token = null
        })
    },
});


const {
    actions,
    reducer
} = userRegisterSlice
export const {
    save
} = actions;
export default reducer;