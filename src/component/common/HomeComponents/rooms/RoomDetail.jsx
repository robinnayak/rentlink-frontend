import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { MEDIA_URL } from "../../../api/base";
import { useSelector } from "react-redux";
import Navbar from "../../Navbar/Navbar";
import { getRoomsDetailApi } from "../../../api/auth/request";

const RoomDetails = () => {
  const location = useLocation();
  const { room_id } = location.state || {}; // Get the passed room ID
  const token = useSelector((state) => state.auth?.token);
  const user_type = useSelector((state) => state.auth?.user_type); // Get user type (Leasee or Landlord)
  const [roomData, setRoomData] = useState(null); // State to hold room data
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate(); // For redirecting to payment

  // Fetch room details by room ID
  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const res = await getRoomsDetailApi(token, room_id);
        setRoomData(res); // Assuming the response structure has data field
        setLoading(false);
      } catch (error) {
        console.error("Error fetching room details:", error);
        setLoading(false);
      }
    };

    if (room_id) {
      fetchRoomDetails();
    }
  }, [room_id, token]);

  // Handle Confirm Visit (For Landlord)
  const handleConfirm = (room_id) => {
    alert(`Visit confirmed for room: ${room_id}`);
  };

  // Handle Cancel Visit (For Landlord)
  const handleCancel = (room_id) => {
    alert(`Visit canceled for room: ${room_id}`);
  };

  // Handle Request Visit (For Leasee)
  const handleRequestVisit = (room_id) => {
    alert(`Visit request submitted for room: ${room_id}`);
  };

  // Handle Deposit (for both Leasee and Landlord)
  const handleDeposit = (room_id, room_title) => {
    navigate("/payment", { state: { room_id,room_title } });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <p className="ml-4 text-lg">Loading room details...</p>
      </div>
    );
  }

  if (!roomData) {
    return <p className="text-center mt-10">No room data available</p>;
  }

  const {
    title,
    description,
    price,
    address,
    sub_address,
    contact_number,
    location_url,
    has_electricity,
    has_wifi,
    has_water_supply,
    has_parking,
    pets_allowed,
    smoking_allowed,
    curfew_time,
    photos,
    owner_email,
  } = roomData;

  const room_link = `${MEDIA_URL}${photos}` || null;

  const renderMapOrPayment = () => {
    if (location_url.startsWith("http") || location_url.startsWith("https")) {
      return (
        <>
          <a
            href={location_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-white bg-purple-600 border border-blue-500 rounded-lg px-4 py-2 mt-4 inline-block hover:bg-blue-700 transition duration-300"
          >
            View on Map
          </a>
          <button
            onClick={() => handleRequestVisit(room_id)}
            className="ml-4 text-white bg-blue-600 border border-blue-500 rounded-lg px-4 py-2 mt-4 inline-block hover:bg-blue-700 transition duration-300"
          >
            Request Visit
          </button>
        </>
      );
    } else {
      return <p className="text-red-500 mt-2">{location_url}</p>;
    }
    
  };

  return (
    <>
      <Navbar />

      <div className="container my-8 p-8 bg-white rounded-lg shadow-xl max-w-4xl mx-auto transition-all duration-300">
        <h1 className="text-4xl font-bold mb-6 text-gray-900 text-center">
          {title}
        </h1>

        {/* Room Image */}
        {room_link ? (
          <img
            src={room_link}
            alt={title}
            className="w-full h-80 object-cover mb-6 rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
          />
        ) : (
          <div className="w-full h-80 bg-gray-300 flex items-center justify-center mb-6 rounded-lg">
            <p className="text-gray-500">No Image Available</p>
          </div>
        )}

        {/* Room Details */}
        <div className="text-center">
          <p className="text-lg text-gray-700 mb-4">{description}</p>
          <p className="text-2xl text-gray-900 mb-6 font-semibold">
          NRP {price} /month
          </p>
          <p className="text-gray-700 mb-2">
            Location: {address}, {sub_address}
          </p>
          <p className="text-gray-700 mb-2">Contact: {contact_number}</p>
          <p className="text-gray-700 mb-4">Owner Email: {owner_email}</p>
        </div>

        {/* Map or Payment Section */}
        <div className="flex justify-center mt-8">{renderMapOrPayment()}</div>

        {/* Action Buttons */}
        <div className="flex justify-center">
          <ActionButtons
            user_type={user_type}
            room_id={room_id}
            location_url={location_url}
            handleRequestVisit={handleRequestVisit}
            handleConfirm={handleConfirm}
            handleCancel={handleCancel}
            handleDeposit={handleDeposit}
            room_title={title}
          />
        </div>

        {/* Room Services */}
        <div className="mt-8 grid grid-cols-2 gap-4">
          <p className="text-gray-700">
            Electricity: {has_electricity ? "Yes" : "No"}
          </p>
          <p className="text-gray-700">WiFi: {has_wifi ? "Yes" : "No"}</p>
          <p className="text-gray-700">
            Water Supply: {has_water_supply ? "Yes" : "No"}
          </p>
          <p className="text-gray-700">Parking: {has_parking ? "Yes" : "No"}</p>
          <p className="text-gray-700">
            Pets Allowed: {pets_allowed ? "Yes" : "No"}
          </p>
          <p className="text-gray-700">
            Smoking Allowed: {smoking_allowed ? "Yes" : "No"}
          </p>
          {curfew_time && (
            <p className="text-gray-700">Curfew Time: {curfew_time}</p>
          )}
        </div>
      </div>
    </>
  );
};

// Separate ActionButtons Component
const ActionButtons = ({
  user_type,
  room_id,
  location_url,
  handleRequestVisit,
  handleConfirm,
  handleCancel,
  handleDeposit,
  room_title,
}) => {
  // Show buttons if location URL is not HTTP/HTTPS
  if (!location_url.startsWith("http") && !location_url.startsWith("https")) {
    if (user_type === "Leasee") {
      return (
        <div className="flex space-x-4 mt-6">
          <button
            onClick={() => handleRequestVisit(room_id)}
            className="text-white bg-blue-600 border border-blue-500 rounded-lg px-4 py-2 hover:bg-blue-700 transition duration-300"
          >
            Request Visit
          </button>
          <button
            onClick={() => handleDeposit(room_id,room_title)}
            className="text-white bg-green-600 border border-green-500 rounded-lg px-4 py-2 hover:bg-green-700 transition duration-300"
          >
            Deposit Now
          </button>
        </div>
      );
    } 
    
  }
  // If location URL is HTTP/HTTPS, show buttons for both Leasee and Landlord
  if (location_url.startsWith("http") && location_url.startsWith("https")) {
    if(user_type==="Landlord"){
      return (
        <div className="flex space-x-4 mt-6">
          <button
            onClick={() => handleConfirm(room_id)}
            className="text-white bg-green-600 border border-green-500 rounded-lg px-4 py-2 hover:bg-green-700 transition duration-300"
          >
            Confirm Visit
          </button>
          <button
            onClick={() => handleCancel(room_id)}
            className="text-white bg-red-600 border border-red-500 rounded-lg px-4 py-2 hover:bg-red-700 transition duration-300"
          >
            Cancel Visit
          </button>
        </div>
      );
    }
  }

  return null;
};

export default RoomDetails;
