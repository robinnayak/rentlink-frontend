import React, { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { getOwnerRoomsByIdAPI } from "../api/auth/request";
import { useSelector } from "react-redux";
import { MEDIA_URL } from "../api/base"; // Assuming you have a base URL for image links
import Navbar from "../common/Navbar/Navbar";

const ViewRoom = () => {
  const location = useLocation();
  const token = useSelector((state) => state.auth?.token);
  const room_id = location.state?.room_id;
  const [roomDetails, setRoomDetails] = useState(null); // State to store room details

  const fetchOwnerRoomById = useCallback(async () => {
    try {
      const res = await getOwnerRoomsByIdAPI(token, room_id);
      setRoomDetails(res); // Store the room details in state
      console.log("Room details:", res);
    } catch (error) {
      console.log("Error fetching room details:", error);
    }
  }, [token, room_id]);

  useEffect(() => {
    fetchOwnerRoomById();
  }, [fetchOwnerRoomById]);
  if (!roomDetails) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    ); // Center loading text
  }

  const {
    title,
    description,
    price,
    address,
    sub_address,
    contact_number,
    has_electricity,
    has_wifi,
    has_water_supply,
    has_parking,
    is_available,
    pets_allowed,
    smoking_allowed,
    location_url,
    photos,
  } = roomDetails;

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-6 px-4 lg:px-0">
        <h1 className="text-3xl font-bold mb-4 text-center lg:text-left">
          {title}
        </h1>

        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* Room Image */}
          <div className="lg:w-1/2">
            {photos ? (
              <img
                src={`${MEDIA_URL}${photos}`}
                alt="Room"
                className="w-full h-auto object-cover rounded-lg shadow-lg transition-transform duration-300 hover:scale-105"
              />
            ) : (
              <div className="text-gray-500">No image available</div>
            )}
          </div>

          {/* Room Details */}
          <div className="lg:w-1/2 space-y-4">
            <p className="text-lg">
              <strong>Description:</strong> {description}
            </p>
            <p className="text-lg">
              <strong>Price:</strong> NRP {price}
            </p>
            <p className="text-lg">
              <strong>Address:</strong> {address}, {sub_address}
            </p>
            <p className="text-lg">
              <strong>Contact Number:</strong> {contact_number}
            </p>
            <p className="text-lg">
              <strong>Location:</strong>{" "}
              <a
                href={location_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline transition-colors hover:text-blue-800"
              >
                View on Map
              </a>
            </p>
            <p className="text-lg">
              <strong>Availability:</strong>{" "}
              <span
                className={`${
                  is_available ? "text-green-600" : "text-red-600"
                } font-semibold`}
              >
                {is_available ? "Available" : "Not Available"}
              </span>
            </p>

            {/* Amenities */}
            <div className="mt-4">
              <h2 className="text-xl font-semibold mb-2">Amenities:</h2>
              <ul className="list-disc pl-5 space-y-1">
                <li>Electricity: {has_electricity ? "Yes" : "No"}</li>
                <li>Wi-Fi: {has_wifi ? "Yes" : "No"}</li>
                <li>Water Supply: {has_water_supply ? "Yes" : "No"}</li>
                <li>Parking: {has_parking ? "Yes" : "No"}</li>
                <li>Pets Allowed: {pets_allowed ? "Yes" : "No"}</li>
                <li>Smoking Allowed: {smoking_allowed ? "Yes" : "No"}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewRoom;
