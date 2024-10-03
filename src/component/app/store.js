import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./feature/authSlice"
const store = configureStore({
  reducer: {
    auth: authReducer,
    // profile: profileReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false, // Disable immutable check
      serializableCheck: false, // Optionally disable serializable check
    }),
});

export default store;