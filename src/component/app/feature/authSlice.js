import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie"
const initialState = {
  status: "",
  user: "",
  email:"",
  token: "",
  user_type: "",
  identity_is_verified: "",
  is_landowner:false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.email = action.payload.email || ""
      state.is_landowner = action.payload.is_landowner

      if (state.is_landowner) {
        state.user_type = "Landlord";
      } else {
        state.user_type = "Leasee";
      }
    },
    setToken: (state, action) => {
      state.token = action.payload; // Store token
      state.status = "Logged In";
    },
    setIdentityVerified: (state, action) => {
      state.identity_is_verified = action.payload;
    },

    setLogout: (state) => {
      state.status = "Logged Out";
      state.token = "";
      state.user_type = "";
      state.user = "";
      Cookies.remove("rent_room_token");
      Cookies.remove("rent_room_email");
      Cookies.remove("rent_room_is_landowner");
    },
  },
});

export const { setToken, setLogout, setUser,setIdentityVerified } = authSlice.actions;
export default authSlice.reducer;
