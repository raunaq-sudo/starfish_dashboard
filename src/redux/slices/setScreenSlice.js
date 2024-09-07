import { createSlice } from '@reduxjs/toolkit'

export const setScreenReducer = createSlice({
  name: 'screen',
  initialState: {
    screen: 'dashboard',
    screenData: []
  },
  reducers: {
    setScreen: (state, action) => {
      state.screen = action.payload
    },
    setScreenData: (state, action) => {
        state.screenData = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setScreen, setScreenData } = setScreenReducer.actions

export default setScreenReducer.reducer