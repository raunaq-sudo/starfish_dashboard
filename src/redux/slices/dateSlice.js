import { createSlice } from '@reduxjs/toolkit'

export const dateFormatSlice = createSlice({
  name: 'dateFormat',
  initialState: {
    value: 'MM-dd-yyyy',
    periodFrom: "",
    periodTo: "",
    periodSelect:true,
    periodData:undefined,
    periodSwitcher:false,
    defaultDateValue:undefined
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
    },
    setDefaultDateValue:(state, action)=>{
      state.defaultDateValue = action.payload
    }
  },

})

// Action creators are generated for each case reducer function
export const { setDateFormat, setPeriodFrom, setPeriodTo, 
            setPeriodSelect, setPeriodData, setPeriodSwitcher,
           setDefaultDateValue } = dateFormatSlice.actions

export default dateFormatSlice.reducer