import { createSlice } from '@reduxjs/toolkit'

export const dateFormatSlice = createSlice({
  name: 'dateFormat',
  initialState: {
    value: 'MM-dd-yyyy',
    periodFrom: "",
    periodTo: "",
    periodSelect:false,
    periodData:undefined,
    periodSwitcher:false,
  },
  reducers: {
    setDateFormat: (state, action) => {
      state.value = action.payload
    },
    setPeriodFrom: (state, action) => {
      state.periodFrom = action.payload
    },
    setPeriodTo: (state, action) => {
      state.periodTo = action.payload
    },
    setPeriodSelect:(state, action)=>{
      state.periodSelect = action.payload
    },
    setPeriodData:(state, action)=>{
      state.periodData = action.payload
    },
    setPeriodSwitcher:(state, action)=>{
      state.periodSwitcher = action.payload
    }
  },

})

// Action creators are generated for each case reducer function
export const { setDateFormat, setPeriodFrom, setPeriodTo, 
            setPeriodSelect, setPeriodData, setPeriodSwitcher } = dateFormatSlice.actions

export default dateFormatSlice.reducer