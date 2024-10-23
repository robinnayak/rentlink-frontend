import React, { useState } from "react";
import Navbar from "../common/Navbar/Navbar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postAddRoom } from "../api/auth/request";
import { LocationName } from "../locations/LocationsName";

// Instructions component for Google Maps URL
const GoogleMapsUrlInstructions = () => (
  <div className="p-4 mb-6 bg-blue-100 rounded-lg border border-blue-300">
    <h3 className="text-lg font-semibold text-blue-700">
      How to Obtain a Google Maps URL
    </h3>
    <ol className="list-decimal ml-4 mt-2 text-blue-600">
      <li>Open Google Maps and search for the desired location.</li>
      <li>Click on the pin or drop a pin on the exact location.</li>
      <li>Click on the "Share" button.</li>
      <li>
        Copy the link provided under "Share" and paste it into the location URL
        field.
      </li>
    </ol>
  </div>
);

const AddRoom = () => {
  const [roomData, setRoomData] = useState({
    title: "",
    description: "",
    price: "",
    address: "",
    sub_address: "",
    location_url: "",
    has_electricity: true,
    has_wifi: true,
    has_water_supply: true,
    has_parking: false,
    is_available: true,
    pets_allowed: true,
    smoking_allowed: false,
  });
  const [isLoading, setIsLoading] = useState(false); // New loading state
  const token = useSelector((state) => state.auth?.token);
  const [photo, setPhoto] = useState(null); // Single photo (changed from 'photos')
  const [roomImages, setRoomImages] = useState([]); // For multiple room images
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setRoomData({
        ...roomData,
        [name]: checked,
      });
    } else if (name === "photo") {
      setPhoto(files[0]); // Store multiple selected files
    } else if (name === "room_images") {
      setRoomImages(files);
    } else {
      setRoomData({
        ...roomData,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!roomData.location_url) {
      setError("Location URL is required");
      return;
    }

    const formData = new FormData();
    Object.keys(roomData).forEach((key) => {
      formData.append(key, roomData[key]);
    });

    // Append the single room photo
    if (photo) {
      formData.append("photos", photo); // 'photos' key should match the backend model
    }

    // Append multiple room images
    for (let i = 0; i < roomImages.length; i++) {
      formData.append("room_images", roomImages[i]); // 'room_images' key for multiple images
    }
    console.log("final form data", formData);
    try {
      const response = await postAddRoom(token, formData);
      console.log("Room added successfully:", response);
      navigate("/");
    } catch (error) {
      console.error("Error adding room:", error);
      setError("Failed to add the room.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="max-w-xl mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Add Room Page</h1>

        <GoogleMapsUrlInstructions />

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Title *
            </label>
            <input
              type="text"
              name="title"
              value={roomData.title}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2"
              placeholder="Two Bedroom One Kitchen"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Description *
            </label>
            <textarea
              name="description"
              value={roomData.description}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2"
              placeholder="A cozy two-bedroom apartment with a kitchen, ideal for small families or roommates."
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Price *
            </label>
            <input
              type="text"
              name="price"
              value={roomData.price}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Address *
            </label>
            <select
              name="address"
              value={roomData.address}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2"
              required
            >
              <option value="">Select Address</option>
              {LocationName.map((loc) => (
                <option key={loc.value} value={loc.value}>
                  {loc.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Sub Address *
            </label>
            <input
              type="text"
              name="sub_address"
              value={roomData.sub_address}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2"
              placeholder="Near Siddhartha Bank"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Location URL *
            </label>
            <input
              type="text"
              name="location_url"
              value={roomData.location_url}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2"
              placeholder="https://maps.google.com/?q=latitude,longitude"
              required
            />
          </div>
          {/* Single Room Photo */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Room Photo
            </label>
            <input
              type="file"
              name="photo" // Changed to 'photo' for single image
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2"
              accept="image/*"
            />
          </div>

          {/* Multiple Room Images */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Upload Additional Room Images
            </label>
            <input
              type="file"
              name="room_images"
              multiple
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2"
              accept="image/*"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="has_electricity"
                checked={roomData.has_electricity}
                onChange={handleChange}
                className="mr-2"
              />
              Has Electricity
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                name="has_wifi"
                checked={roomData.has_wifi}
                onChange={handleChange}
                className="mr-2"
              />
              Has Wifi
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                name="has_water_supply"
                checked={roomData.has_water_supply}
                onChange={handleChange}
                className="mr-2"
              />
              Has Water Supply
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                name="has_parking"
                checked={roomData.has_parking}
                onChange={handleChange}
                className="mr-2"
              />
              Has Parking
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                name="is_available"
                checked={roomData.is_available}
                onChange={handleChange}
                className="mr-2"
              />
              Is Available
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                name="pets_allowed"
                checked={roomData.pets_allowed}
                onChange={handleChange}
                className="mr-2"
              />
              Pets Allowed
            </label>

            {/* <label className="flex items-center">
              <input
                type="checkbox"
                name="smoking_allowed"
                checked={roomData.smoking_allowed}
                onChange={handleChange}
                className="mr-2"
              />
              Smoking Allowed
            </label> */}
          </div>

          <button
            type="submit"
            className={`bg-blue-500 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-600 transition-colors ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled ={isLoading}
          >
            {isLoading ? "Add room..." : "Add Room"}
          </button>
        </form>
      </div>
    </>
  );
};

export default AddRoom;
