import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  weatherData :{}
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateWeather:(state,action)=>{
      state.weatherData = action.payload
    }
  },
})

export const {  updateWeather } = userSlice.actions

export default userSlice.reducer