import { createSlice } from '@reduxjs/toolkit'

export const dateFormatSlice = createSlice({
  name: 'dateFormat',
  initialState: {
    value: 'MM-dd-yyyy',
  },
  reducers: {
    setDateFormat: (state, action) => {
      state.value = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setDateFormat } = dateFormatSlice.actions

export default dateFormatSlice.reducer