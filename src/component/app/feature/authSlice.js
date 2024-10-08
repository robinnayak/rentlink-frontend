import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "",
  user: "",
  token: "",
  user_type: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      // console.log("state user", state.user);
       if (state.user && state.user?.is_landowner){
        state.user_type = "Landlord";
       }
       else{
        state.user_type = "Leasee";
       }
    },
    setToken: (state, action) => {
      state.token = action.payload; // Store token
      // state.user_type = action.payload.user_type; // Optional: Store user type if needed
      state.status = "Logged In";
    },
    setLogout: (state) => {
      state.status = "Logged Out";
      state.token = "";
      state.user_type = "";
      state.user = "";
    },
  },
});

export const { setToken, setLogout, setUser } = authSlice.actions;
export default authSlice.reducer;
