import React from "react";
import { useNavigate } from "react-router-dom";
import { MEDIA_URL } from "../../../api/base";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

const RoomCard = ({ room, token }) => {
  // const [showDetails, setShowDetails] = useState(false);
  const navigate = useNavigate();
  // console.log("room card",room)
  const handleViewDetails = () => {
    // Pass room data to the route via navigate
    navigate(`/rooms/${room.id}`, { state: { room_id: room.id } });
  };

  const room_link = `${MEDIA_URL}${room.photos}` || null;

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white m-4">
      {/* Image Section */}
      <img
        className="w-full h-48 object-cover"
        src={
          room_link
            ? room_link
            : "https://via.placeholder.com/150/000000/FFFFFF/?text=No+Image"
        }
        alt={room.title}
      />

      <div className="px-6 py-4">
        <h2 className="font-bold text-xl mb-2">{room.title}</h2>
        <p className="text-gray-700 text-base">{room.description}</p>
        <p className="text-gray-900 text-lg font-bold mt-2">
          NRP {room.price} /month
        </p>
        {room.is_available && (
          <div className="flex items-center mt-2">
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="text-green-500 mr-2"
            />
            <span className="text-green-500 font-medium">Available</span>
          </div>
        )}
      </div>

      <div className="px-6 pt-4 pb-2">
        <p className="text-gray-600">
          Location: {room.address}, {room.sub_address}
        </p>
        {token && (
          <p className="text-gray-600">Contact: {room.contact_number}</p>
        )}
        <div className="flex justify-end items-center mt-4">
          <button
            onClick={handleViewDetails}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            View Details
          </button>
        </div>
      </div>

      {/* Details Section
      {showDetails && (
        <div className="px-6 pt-4 pb-2">
          <p>Electricity: {room.has_electricity ? "Yes" : "No"}</p>
          <p>Wifi: {room.has_wifi ? "Yes" : "No"}</p>
          <p>Water Supply: {room.has_water_supply ? "Yes" : "No"}</p>
          <p>Parking: {room.has_parking ? "Yes" : "No"}</p>
          <p>Pets Allowed: {room.pets_allowed ? "Yes" : "No"}</p>
          <p>Smoking Allowed: {room.smoking_allowed ? "Yes" : "No"}</p>
        </div>
      )} */}
    </div>
  );
};

export default RoomCard;
