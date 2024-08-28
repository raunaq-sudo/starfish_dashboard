import { createSlice } from '@reduxjs/toolkit'

export const locationSliceReducer = createSlice({
  name: 'location',
  initialState: {
    location: 'location',
    currency: "&", 
    integration: null,
  },
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload
    },
    setCurrency :(state, action) => {
        state.currency = action.payload
      },
    setIntegration :(state, action) => {
      state.integration = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setLocation, setCurrency, setIntegration } = locationSliceReducer.actions

export default locationSliceReducer.reducer