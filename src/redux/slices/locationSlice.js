import { createSlice } from '@reduxjs/toolkit'

export const locationSliceReducer = createSlice({
  name: 'location',
  initialState: {
    location: 'location',
    currency: "&"
  },
  reducers: {
    setLocation: (state, action) => {
      state.location = action.payload
    },
    setCurrency :(state, action) => {
        state.currency = action.payload
      },
  },
})

// Action creators are generated for each case reducer function
export const { setLocation, setCurrency } = locationSliceReducer.actions

export default locationSliceReducer.reducer