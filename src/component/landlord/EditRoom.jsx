import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { putOwnerRoomsByIdAPI } from "../api/auth/request"; // Import the API
import { MEDIA_URL } from "../api/base";
import { LocationName } from "../locations/LocationsName";
import Navbar from "../common/Navbar/Navbar";

const EditRoom = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const room_id = location.state?.room_id || {};
  const room = location.state?.room || {};
  const token = useSelector((state) => state.auth?.token); // Get token from Redux
  const [isLoading, setIsLoading] = useState(false); // New loading state

  const [formData, setFormData] = useState({
    title: room.title || "",
    description: room.description || "",
    price: room.price || "",
    address: room.address || "",
    sub_address: room.sub_address || "",
    has_electricity: room.has_electricity || false,
    has_wifi: room.has_wifi || false,
    has_water_supply: room.has_water_supply || false,
    has_parking: room.has_parking || false,
    is_available: room.is_available || false,
    pets_allowed: room.pets_allowed || false,
    smoking_allowed: room.smoking_allowed || false,
    location_url: room.location_url || "",
    contact_number: room.contact_number || "",
    photos: room.photos || null, // Store the existing image URL
  });
 // eslint-disable-next-line
  const [roomImages, setRoomImages] = useState(room.room_images || []); // For multiple room images
  const [newRoomImages, setNewRoomImages] = useState([]); // For new uploaded room images
  const [imagePreview, setImagePreview] = useState(
    room.photos ? `${MEDIA_URL}${room.photos}` : null // Load the existing image
  );

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        photos: file, // Update the photos field with the uploaded file
      });
      setImagePreview(URL.createObjectURL(file)); // Preview the uploaded image
    }
  };

  // Handle multiple room images change
  const handleMultipleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    setNewRoomImages(files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const updatedFormData = new FormData();

    // Append all form data fields to FormData object
    Object.keys(formData).forEach((key) => {
      if (key === "photos") {
        // Append 'photos' only if a new image file is selected
        if (formData[key] instanceof File) {
          updatedFormData.append(key, formData[key]);
        }
      } else {
        updatedFormData.append(key, formData[key]);
      }
    });

    // Append new room images (multiple images)
    newRoomImages.forEach((image) => {
      updatedFormData.append("room_images", image); // No index needed; backend will handle it
    });

    try {
      const res = await putOwnerRoomsByIdAPI(token, room_id, updatedFormData);
      console.log("put res", res);
      navigate("/manage-rooms"); // Navigate to the room management page after successful update
    } catch (error) {
      console.error("Error updating room:", error);
      alert("Failed to update the room");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto py-6">
        <h1 className="text-3xl font-bold mb-6">Edit Room {room_id}</h1>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-4 md:grid-cols-2"
          encType="multipart/form-data"
        >
          {/* Title */}
          <div>
            <label className="block font-medium">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="border p-2 w-full"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="border p-2 w-full"
              required
            />
          </div>

          {/* Price */}
          <div>
            <label className="block font-medium">Price</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              className="border p-2 w-full"
              required
            />
          </div>

          {/* Address */}
          <div>
            <label className="block font-medium">Address</label>
            <select
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="mt-1 block w-full border rounded-md p-2"
            >
              <option value="">Select Address</option>
              {LocationName.map((loc) => (
                <option key={loc.value} value={loc.value}>
                  {loc.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sub Address */}
          <div>
            <label className="block font-medium">Sub Address</label>
            <input
              type="text"
              name="sub_address"
              value={formData.sub_address}
              onChange={handleInputChange}
              className="border p-2 w-full"
              required
            />
          </div>

          {/* Location URL */}
          <div>
            <label className="block font-medium">Location From Map URL</label>
            <input
              type="text"
              name="location_url"
              value={formData.location_url}
              onChange={handleInputChange}
              className="border p-2 w-full"
              required
            />
          </div>

          {/* Single Image Upload */}
          <div>
            <label className="block font-medium">Room Image</label>
            <input
              type="file"
              name="photos"
              accept="image/*"
              onChange={handleImageChange}
              className="border p-2 w-full"
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Room Preview"
                className="mt-4 w-64 h-64 object-cover"
              />
            )}
          </div>

          {/* Multiple Images Upload */}
          <div>
            <label className="block font-medium">Additional Room Images</label>
            <input
              type="file"
              name="room_images"
              accept="image/*"
              multiple
              onChange={handleMultipleImagesChange}
              className="border p-2 w-full"
            />
            <div className="mt-4 grid grid-cols-2 gap-4">
              {roomImages.map((img) => (
                <img
                  key={img.id}
                  src={`${MEDIA_URL}${img.image}`}
                  alt={`Room Img`}
                  className="w-32 h-32 object-cover"
                />
              ))}
            </div>
          </div>

          {/* Checkbox for amenities */}
          <div>
            <label className="block font-medium">Electricity</label>
            <input
              type="checkbox"
              name="has_electricity"
              checked={formData.has_electricity}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block font-medium">Wi-Fi</label>
            <input
              type="checkbox"
              name="has_wifi"
              checked={formData.has_wifi}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block font-medium">Water Supply</label>
            <input
              type="checkbox"
              name="has_water_supply"
              checked={formData.has_water_supply}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block font-medium">Has Parking</label>
            <input
              type="checkbox"
              name="has_parking"
              checked={formData.has_parking}
              onChange={handleInputChange}
            />
          </div>

          <div>
            <label className="block font-medium">Pets Allowed</label>
            <input
              type="checkbox"
              name="pets_allowed"
              checked={formData.pets_allowed}
              onChange={handleInputChange}
            />
          </div>

          {/* <div>
            <label className="block font-medium">Smoking Allowed</label>
            <input
              type="checkbox"
              name="smoking_allowed"
              checked={formData.smoking_allowed}
              onChange={handleInputChange}
            />
          </div> */}

          {/* Availability */}
          <div>
            <label className="block font-medium">Is Available</label>
            <input
              type="checkbox"
              name="is_available"
              checked={formData.is_available}
              onChange={handleInputChange}
            />
          </div>

          {/* Submit button */}
          <div className="md:col-span-2">
            <button
              type="submit"
              className={`w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              } `}
              disabled={isLoading}
            >
              {!isLoading ? 'Update Room' : 'Data Updating...' }  
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditRoom;
