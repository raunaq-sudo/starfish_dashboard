import {configureStore} from '@reduxjs/toolkit'
import  dateFormatSlice  from './slices/dateSlice'
import locationSlice from './slices/locationSlice'


export default configureStore({
  reducer: {
    dateFormat: dateFormatSlice,
    locationSelectFormat: locationSlice
  },
})

