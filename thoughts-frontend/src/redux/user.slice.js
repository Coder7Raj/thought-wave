import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    currentCountry: null,
    currentCity: null,
    currentState: null,
    currentAddress: null,
  },
  reducers: {
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setCurrentCountry: (state, action) => {
      state.currentCountry = action.payload;
    },
    setCurrentCity: (state, action) => {
      state.currentCity = action.payload;
    },
    setCurrentAddress: (state, action) => {
      state.currentAddress = action.payload;
    },
    setCurrentState: (state, action) => {
      state.currentState = action.payload;
    },
  },
});
export const {
  setUserData,
  setCurrentCountry,
  setCurrentCity,
  setCurrentState,
  setCurrentAddress,
} = userSlice.actions;
export default userSlice.reducer;
