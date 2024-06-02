import {configureStore} from '@reduxjs/toolkit'
import  dateFormatSlice  from './slices/dateSlice'
import locationSlice from './slices/locationSlice'
import dataFetchSlice from './slices/dataFetchSlice'


export default configureStore({
  reducer: {
    dateFormat: dateFormatSlice,
    locationSelectFormat: locationSlice,
    dataFetch:dataFetchSlice
  },
})

