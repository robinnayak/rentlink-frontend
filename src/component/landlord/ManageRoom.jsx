import React, { useCallback, useEffect, useState } from "react";
import Navbar from "../common/Navbar/Navbar";
import { getOwnerRoomsAPI } from "../api/auth/request";
import { useSelector } from "react-redux";
import { BASE_URL, MEDIA_URL } from "../api/base";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const ManageRoom = () => {
  const token = useSelector((state) => state.auth?.token);
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate();

  const fetchOwnerRooms = useCallback(async () => {
    try {
      const res = await getOwnerRoomsAPI(token);
      setRooms(res || []); // Safely handle if `res` is undefined
    } catch (error) {
      console.error("Error fetching rooms:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching data
    }
  }, [token]);

  useEffect(() => {
    fetchOwnerRooms();
  }, [fetchOwnerRooms]);

  const handleEdit = (roomId, room) => {
    console.log(`Editing room ${roomId}`);
    navigate("/edit-rooms", { state: { room_id: roomId, room: room } });
    // Implement edit logic
  };

  const handleDelete = async (roomId) => {
    // Ask for confirmation before deleting
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this room? This action cannot be undone."
    );

    if (!isConfirmed) {
      return; // Exit if user cancels the deletion
    }

    try {
      const response = await axios.delete(
        `${BASE_URL}/rooms/rooms/${roomId}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Pass the token in headers
          },
        }
      );

      console.log(`Room ${roomId} deleted successfully`, response.data);
      alert("Room deleted successfully!");

      // Fetch the updated list of rooms after deletion
      fetchOwnerRooms();
    } catch (error) {
      console.error(`Failed to delete room ${roomId}:`, error);
      alert("Failed to delete the room.");
    }
  };

  const handleView = (roomId) => {
    console.log(`Viewing room ${roomId}`);
    navigate("/view-rooms", { state: { room_id: roomId } });
    // Implement view logic (maybe a modal or redirect to room details page)
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6">Manage Your Rooms</h1>

        {loading ? (
          <div className="text-center">
            <svg
              className="animate-spin h-8 w-8 text-blue-500 mx-auto"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
            <p className="text-gray-500 mt-2">Loading rooms...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.length > 0 ? (
              rooms.map((room) => (
                <div
                  key={room.id}
                  className="bg-white shadow-lg rounded-lg p-6 transition-transform transform hover:scale-105"
                >
                  <h2 className="text-xl font-bold mb-2">{room.title}</h2>
                  <p className="text-gray-700 mb-2">{room.description}</p>
                  <p className="text-gray-600 mb-2">Price: NPR {room.price}</p>
                  <p className="text-gray-600 mb-2">Address: {room.address}</p>
                  <p className="text-gray-600 mb-2 flex items-center">
                    Available:
                    {room.is_available ? (
                      <span className="text-green-500 ml-2 flex items-center">
                        <FontAwesomeIcon
                          icon={faCheckCircle}
                          className="mr-1"
                        />
                        Yes
                      </span>
                    ) : (
                      <span className="text-red-500 ml-2 flex items-center">
                        <FontAwesomeIcon
                          icon={faTimesCircle}
                          className="mr-1"
                        />
                        No
                      </span>
                    )}
                  </p>

                  <div className="mb-2">
                    <p className="text-gray-500 text-sm">
                      <strong>Amenities:</strong>{" "}
                      {room.has_electricity ? "Electricity, " : ""}
                      {room.has_wifi ? "Wi-Fi, " : ""}
                      {room.has_water_supply ? "Water Supply, " : ""}
                      {room.has_parking ? "Parking" : ""}
                    </p>
                  </div>

                  <div className="mb-4">
                    {room.photos ? (
                      <img
                        src={`${MEDIA_URL}${room.photos}`}
                        alt={room.title}
                        className="rounded-lg h-32 w-full object-cover mb-4"
                      />
                    ) : (
                      <div className="h-32 w-full bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                        <span className="text-gray-500">
                          No Photo Available
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between">
                    <button
                      onClick={() => handleView(room.id)}
                      className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 transition-colors"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleEdit(room.id, room)}
                      className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(room.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-700">
                No rooms available. Add a new room to manage.
              </p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default ManageRoom;
