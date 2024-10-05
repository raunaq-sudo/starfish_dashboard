import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  location: 'location',
  currency: "$", 
  integration: null,
  locationData: []
}

export const locationSliceReducer = createSlice({
  name: 'location',
  initialState: initialState, 
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload
    },
    setCurrency: (state, action) => {
      state.currency = action.payload ? action.payload : initialState.currency
    },
    setIntegration: (state, action) => {
      state.integration = action.payload
    },
    setLocationData: (state, action) => {
      state.locationData = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setLocation, setCurrency, setIntegration, setLocationData } = locationSliceReducer.actions

export default locationSliceReducer.reducer
