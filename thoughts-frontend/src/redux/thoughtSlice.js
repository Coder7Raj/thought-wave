import { createSlice } from "@reduxjs/toolkit";

const thoughtSlice = createSlice({
  name: "thought",
  initialState: {
    myThoughts: [], // store all thoughts of user
    lastAddedThought: null, // optional: store the last added thought
  },
  reducers: {
    setMyThoughts: (state, action) => {
      // replace all thoughts (e.g., when fetching from backend)
      state.myThoughts = action.payload;
    },
    addThought: (state, action) => {
      // push the newly added thought to array
      state.myThoughts.unshift(action.payload); // newest first
      state.lastAddedThought = action.payload; // optional
    },
    removeThought: (state, action) => {
      // remove a thought by id
      state.myThoughts = state.myThoughts.filter(
        (thought) => thought._id !== action.payload,
      );
    },
  },
});

export const { setMyThoughts, addThought, removeThought } =
  thoughtSlice.actions;
export default thoughtSlice.reducer;
