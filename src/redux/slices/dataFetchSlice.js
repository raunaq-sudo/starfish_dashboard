import { createSlice } from '@reduxjs/toolkit'

export const dataFetchSliceReducer = createSlice({
  name: 'dataFetch',
  initialState: {
    dataLoading: false
  },
  reducers: {
    setDataLoading: (state, action) => {
      state.dataLoading = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setDataLoading } = dataFetchSliceReducer.actions

export default dataFetchSliceReducer.reducer