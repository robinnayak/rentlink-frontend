import axios from "axios";
import {
  deposit_api,
  login_api,
  register_api,
  roomview_api,
  room_api,
  logout_api,
  filter_room_api,
  contact_api,
} from "./endpoints";

export const postRegisterAPI = async (credentials) => {
  try {
    console.log("credential", credentials);

    const res = await axios.post(
      register_api,
      {
        email: credentials.email,
        first_name: credentials.first_name,
        last_name: credentials.last_name,
        password: credentials.password,
        password2: credentials.password2,
        is_landowner: credentials.is_landowner, // Ensure this is a boolean (true/false)
        contact_number: credentials.contact_number,
      },
      {
        headers: {
          "Content-Type": "application/json", // Ensure you are sending JSON data
        },
      }
    );

    // console.log("register res..", res.data);
    return res.data;
  } catch (error) {
    console.error(
      "Error registering user:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const postLoginApi = async (credentials) => {
  try {
    const res = await axios.post(
      login_api,
      {
        email: credentials.email,
        password: credentials.password,
      },
      {
        headers: {
          "Content-Type": "application/json", // Ensure sending JSON data
        },
      }
    );
    // console.log("Login response:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error logging in:", error.response?.data || error.message);
    throw error;
  }
};
export const LogoutApi = async (token) => {
  try {
    const res = await axios.get(logout_api, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // console.log("Logout response:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error logging out:", error.response?.data || error.message);
    throw error;
  }
};

export const getRoomsApi = async (token) => {
  try {
    const headers = {
      "Content-Type": "application/json", // Ensure sending JSON data
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`; // Add Authorization header if token is present
    }

    const res = await axios.get(roomview_api, { headers });
    // console.log("Rooms response:", res.data);
    return res.data;
  } catch (error) {
    console.error(
      "Error fetching rooms:",
      error.response?.data || error.message
    );
    throw error;
  }
};
export const getRoomsDetailApi = async (token, id) => {
  try {
    const headers = {
      "Content-Type": "application/json", // Ensure sending JSON data
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`; // Add Authorization header if token is present
    }

    const res = await axios.get(`${roomview_api}${id}`, { headers });
    // console.log("Rooms response:", res.data);
    return res.data;
  } catch (error) {
    console.error(
      "Error fetching rooms:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const postDeposit = async (token, id) => {
  console.log("id", id);
  console.log("token inside postdeposit", token);
  try {
    const res = axios.post(
      deposit_api,
      {
        room_id: id,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log("Deposit response:", res.data);
    return res.data;
  } catch (error) {
    console.error("Error depositing:", error.response?.data || error.message);
    throw error;
  }
};

// "http://localhost:8000/rooms/rooms/",

export const postAddRoom = async (token, formData) => {
  console.log("postAddRoom token", token);
  console.log("postAddRoom formData", formData);
  try {
    const response = await axios.post(room_api, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Room added successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error adding room:", error);
  }
};

export const getOwnerRoomsAPI = async (token) => {
  const response = await axios.get(room_api, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("owner rooms data", response.data);
  return response.data;
};

export const getOwnerRoomsByIdAPI = async (token, room_id) => {
  console.log("getOwnerRoomsByIdAPI", room_id, token);
  const response = await axios.get(`${room_api}${room_id}/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  console.log("owner rooms data by id", response.data);
  return response.data;
};

// putOwnerRoomsByIdAPI(token, room_id, formData);
export const putOwnerRoomsByIdAPI = async (token, room_id, formData) => {
  const response = await axios.put(`${room_api}${room_id}/`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};


export const getFilterRoomsApi = async (token, filters = null) => {  
  try {
    const headers = {
      "Content-Type": "application/json",
    };

    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    // Check if filters are provided and construct the query string if so
    const queryParams = filters && Object.keys(filters).length > 0 
      ? `?${new URLSearchParams(filters).toString()}` 
      : '';

    const res = await axios.get(`${filter_room_api}${queryParams}`, { headers });
    
    return res.data;
  } catch (error) {
    console.error("Error fetching rooms:", error.response?.data || error.message);
    throw error;
  }
};

export const postContactUs = async (formData)=>{
  const res = await axios.post(contact_api,formData,{
    headers:{
      "Content-Type":"application/json",
    }
  })
  console.log("contact form res",res)
  return res.data
}