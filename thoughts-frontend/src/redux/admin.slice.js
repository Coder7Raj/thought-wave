import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    myStoreData: null,
  },
  reducers: {
    setStoreData: (state, action) => {
      state.myStoreData = action.payload;
    },
  },
});
export const { setStoreData } = adminSlice.actions;
export default adminSlice.reducer;
