import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MEDIA_URL } from "../../../api/base";
import { useSelector } from "react-redux";
import Navbar from "../../Navbar/Navbar";
import { getIdentityApi, getRoomsDetailApi } from "../../../api/auth/request";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faChevronLeft,
  faChevronRight,
  faShareSquare,
} from "@fortawesome/free-solid-svg-icons";
import Comment from "../../comment/Comment";
import { handleApiError } from "../../../utils/ApiErrorHandle";

const RoomDetails = () => {
  // const location = useLocation();
  // const { room_id } = location.state || {}; // Get the passed room ID
  const { pk: room_id } = useParams();
  const token = useSelector((state) => state.auth?.token);
  const user_type = useSelector((state) => state.auth?.user_type); // Get user type (Leasee or Landlord)
  const [roomData, setRoomData] = useState(null); // State to hold room data
  const [loading, setLoading] = useState(true); // Loading state
  const [isCopied, setIsCopied] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // For slider control
  const navigate = useNavigate(); // For redirecting to payment

  //verifications data
  const [identityData, setIdentityData] = useState({
    is_verified: false,
  });

  const [error, setError] = useState(null);
  // Fetch room details by room ID

  const handleShareLink = () => {
    console.log("window location herf", window.location.href);
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // Reset after 2 seconds
      })
      .catch((error) => console.error("Failed to copy link:", error));
  };
  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const res = await getRoomsDetailApi(token, room_id);

        setRoomData(res); // Assuming the response structure has data field
        // console.log("res room detail data", res);
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

  useEffect(() => {
    const fetchVerificationData = async () => {
      try {
        const res = await getIdentityApi(token, room_id);
        setIdentityData(res);
        // console.log("res identity data from room details", res.is_verified);
        setError(null);
      } catch (error) {
        console.error("Identity fetch error:", error);
        setError(handleApiError(error));
      }
    };
    fetchVerificationData();
  });

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
    alert(
      `Visit request submitted for room ID: ${room_id}. This feature is currently under maintenance.`
    );
  };

  // Handle Deposit (for both Leasee and Landlord)
  const handleDeposit = (room_id, room_title) => {
    navigate("/payment", { state: { room_id, room_title } });
  };

  const handleView360 = (room_id, room_title) => {
    navigate("/view360", { state: { room_id, room_title } });
  };
  const handleIdentityRoom = (room_id, room_title) => {
    navigate("/identity", { state: { room_id, room_title, token } });
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
    // smoking_allowed,
    curfew_time,
    photos, // Single main image
    room_images, // Array of additional images
    owner_email,
  } = roomData;

  // Combine photos and room_images for the slider
  const allImages = [
    { id: "main", image: photos }, // Main image
    ...(room_images || []), // Additional images, if available
  ];

  // Handling the navigation of the slider
  const handlePrevious = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? allImages.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === allImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const tokenExist = () => {
    if (!token) {
      return (
        <div className="text-red-600 text-center bg-red-200 p-2 rounded animate-pulse mb-4">
          Login required to view map and contact Details.
        </div>
      );
    }
  };

  const renderMapOrPayment = () => {
    if (location_url.startsWith("http") || location_url.startsWith("https")) {
      return (
        <>
          <a
            href={location_url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 mt-4 text-white font-semibold bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg shadow-md transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
          >
            View on Map
          </a>
          <button
            onClick={() => handleRequestVisit(room_id)}
            className="ml-4 inline-block px-6 py-3 mt-4 text-white font-semibold bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg shadow-md transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-lg"
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
      <div className="mb-4">
        <Navbar />
      </div>

      <div className="container my-8 p-8 bg-white rounded-lg shadow-xl max-w-4xl mx-auto transition-all duration-300 pt-24">
        <h1 className="text-4xl font-bold mb-6 text-gray-900 text-center">
          {title}
        </h1>
        {error && token && (
          <div className="text-red-600 text-center bg-red-200 p-2 rounded animate-pulse mb-4">
            {error} Verification required to view map and contact number.
          </div>
        )}
        {tokenExist()}
        {identityData && identityData?.is_verified && (
          <div className="text-green-600 text-center bg-green-200 p-2 rounded animate-pulse mb-4">
            User identity has been verified successfully.
          </div>
        )}

        {/* Room Image Slider */}
        <div className="relative mb-6">
          {allImages && allImages.length > 0 ? (
            <div className="relative">
              <img
                src={`${MEDIA_URL}${allImages[currentImageIndex].image}`}
                alt={`Room Img ${currentImageIndex + 1}`}
                className="w-full h-80 object-cover rounded-lg shadow-md transition-transform duration-300 hover:scale-105"
              />
              {/* Left Arrow */}
              <button
                onClick={handlePrevious}
                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-600 transition-colors"
              >
                <FontAwesomeIcon icon={faChevronLeft} />
              </button>
              {/* Right Arrow */}
              <button
                onClick={handleNext}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2 hover:bg-gray-600 transition-colors"
              >
                <FontAwesomeIcon icon={faChevronRight} />
              </button>
            </div>
          ) : (
            <div className="w-full h-80 bg-gray-300 flex items-center justify-center mb-6 rounded-lg">
              <p className="text-gray-500">No Image Available</p>
            </div>
          )}
        </div>
        <button
          onClick={handleShareLink}
          className="text-gray-700 hover:text-gray-900 focus:outline-none transition-colors"
        >
          <FontAwesomeIcon icon={faShareSquare} size="lg" />
        </button>

        {isCopied && (
          <p className="text-green-500 text-center mt-2">
            Link copied to clipboard!
          </p>
        )}
        {/* Room Details */}
        <div className="text-center">
          {!token && (
            <p className="text-2xl text-gray-900 mb-6 font-semibold">
              Please login to see more details
            </p>
          )}
          <p className="text-lg text-gray-700 mb-4">{description}</p>
          <p className="text-2xl text-gray-900 mb-6 font-semibold">
            NRP {price} /month
          </p>
          <p className="text-gray-700 mb-2">
            Location: {address}, {sub_address}
          </p>

          {token && identityData.is_verified && (
            <p className="text-gray-700 mb-2">Contact: {contact_number}</p>
          )}
          <p className="text-gray-700 mb-4">Owner Email: {owner_email}</p>
        </div>

        {/* Map or Payment Section */}
        {identityData?.is_verified && (
          <div className="flex justify-center mt-8">{renderMapOrPayment()}</div>
        )}

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
            handleView360={handleView360}
            handleIdentityRoom={handleIdentityRoom}
            room_title={title}
            identityData={identityData}
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
          {/* <p className="text-gray-700">
            Smoking Allowed: {smoking_allowed ? "Yes" : "No"}
          </p> */}
          {curfew_time && (
            <p className="text-gray-700">Curfew Time: {curfew_time}</p>
          )}
        </div>
      </div>

      <div>{token && <Comment token={token} room_id={room_id} />}</div>
    </>
  );
};
const ActionButtons = ({
  user_type,
  room_id,
  location_url,
  handleRequestVisit,
  handleConfirm,
  handleCancel,
  handleDeposit,
  handleView360,
  room_title,
  handleIdentityRoom,
  identityData,
}) => {
  // Show buttons if location URL is not HTTP/HTTPS
  if (user_type === "Leasee" || user_type === "Landlord") {
    if (identityData?.is_verified) {
      if (
        !location_url.startsWith("http") &&
        !location_url.startsWith("https")
      ) {
        return (
          <div className="flex space-x-4 mt-6">
            <button
              onClick={() => handleRequestVisit(room_id)}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-md hover:scale-105 hover:shadow-lg transform transition-all duration-300 ease-in-out"
            >
              Request Visit
            </button>
            <button
              onClick={() => handleDeposit(room_id, room_title)}
              className="px-6 py-3 rounded-lg bg-gradient-to-r from-green-500 to-teal-600 text-white font-semibold shadow-md hover:scale-105 hover:shadow-lg transform transition-all duration-300 ease-in-out"
            >
              Deposit Now
            </button>
            {/* <button
            onClick={() => handleView360(room_id, room_title)}
            className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-600 text-white font-semibold shadow-md hover:scale-105 hover:shadow-lg transform transition-all duration-300 ease-in-out"
          >
            View 360
          </button> */}
          </div>
        );
      }
    }

    return (
      <div className="flex space-x-4 mt-6">
        <button
          onClick={() => handleIdentityRoom(room_id, room_title)}
          className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold shadow-md hover:scale-105 hover:shadow-lg transform transition-all duration-300 ease-in-out"
        >
          Get Contact
        </button>
      </div>
    );
  }
  return (
    <div className="flex space-x-4 mt-6">
      {/* <button
            onClick={() => handleView360(room_id, room_title)}
            className="text-white bg-green-600 border border-green-500 rounded-lg px-4 py-2 hover:bg-green-700 transition duration-300"
          >
            View 360
          </button> */}
    </div>
  );
};

export default RoomDetails;
