import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "./admin.slice.js";
import userReducer from "./user.slice.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
    admin: adminReducer,
  },
});
