import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar/Navbar";
import SearchBar from "./HomeComponents/SearchBar";
import { getFilterRoomsApi } from "../api/auth/request";
import RoomList from "./HomeComponents/rooms/RoomList";
import { handleApiError } from "../utils/ApiErrorHandle";
import ApiErrors from "./ApiErrors";
// import Cookies from "js-cookie";
const Home = () => {
  const [rooms, setRooms] = useState([]);
  const token = useSelector((state) => state.auth?.token);
  // const token = Cookies.get('token')
  // console.log("protected route token",token)

  const [filter, setFilter] = useState({}); // Initial filter is an empty object
  const [loading,setLoading] = useState(true)
  const [error,setError] = useState(null)
  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true)
      try {
        // Pass the token and filters to the API call
        const res = await getFilterRoomsApi(token, filter);
        setRooms(res); // Assuming res is the array of rooms
      } catch (error) {
        const errorMessage = handleApiError(error)
        setError(errorMessage)
      }finally{
        setLoading(false)
      }
    };

    fetchRooms(); // Fetch rooms whenever filter or token changes
  }, [token, filter]);

  return (
    <>
      <Navbar />
      <div className="container mx-auto my-8">
        <h1 className="text-3xl font-bold text-center mb-6">Find Your Perfect Rental</h1>
        <div className="flex justify-center mb-8">
          <SearchBar onSearch={setFilter} /> {/* Pass setFilter to handle search */}
        </div>
        {loading ? (
          <div className="text-center">Loading...</div> // Render loading indicator
        ) : (
          <RoomList rooms={rooms} />
        )}
        <ApiErrors error={error}/>
      </div>
    </>
  );
};

export default Home;
