import { configureStore } from '@reduxjs/toolkit'
import {default as messageLoader} from './message';
import loginReducer  from './signInUpSlice'
import artistReducer  from './artistSlice'
import keywordReducer from './keywordSlice'
import artistImageReducer from './artistImageSlice'
import ArtistDataAPI from './artistDataSlice';
import artistImageDataSlice from './artistImageDataSlice';
import artistImageKeywordDataSlice from './artistImageKeywordDataSlice';
import artistImageDivisionDataSlice from './artistImageDivisionDataSlice';
import selectedDivision from './selectedDivision';
import AddToCart from './addToCart';
import bannerImages from './bannerImages';
import newestArtistImageDataSlice from './newestArtistImageDataSlice';
import recentlyArtistImageDataSlice from './recentlyArtistImageDataSlice';


export const store = configureStore({
  reducer: {
    'message':messageLoader,
    loginReducer,
    artistReducer,
    keywordReducer,
    artistImageReducer,
    ArtistDataAPI,
    artistImageDataSlice,
    artistImageKeywordDataSlice,
    artistImageDivisionDataSlice,
    selectedDivision,
    AddToCart,
    newestArtistImageDataSlice,
    recentlyArtistImageDataSlice,
    bannerImages
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }),
})
