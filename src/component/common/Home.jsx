import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar/Navbar";
import SearchBar from "./HomeComponents/SearchBar";
import { getFilterRoomsApi } from "../api/auth/request";
import RoomList from "./HomeComponents/rooms/RoomList";

const Home = () => {
  const [rooms, setRooms] = useState([]);
  const token = useSelector((state) => state.auth?.token);
  const [filter, setFilter] = useState({}); // Initial filter is an empty object
  const [loading,setLoading] = useState(true)
  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true)
      try {
        // Pass the token and filters to the API call
        const res = await getFilterRoomsApi(token, filter);
        setRooms(res); // Assuming res is the array of rooms
      } catch (error) {
        console.error("Error fetching rooms:", error);
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
      </div>
    </>
  );
};

export default Home;
