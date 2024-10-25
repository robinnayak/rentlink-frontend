import React, { useState } from "react";
import Navbar from "../common/Navbar/Navbar";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postAddRoom } from "../api/auth/request";
import { LocationName } from "../locations/LocationsName"; // Import your location data

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
    province: "",
    district: "",
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

  const [districtOptions, setDistrictOptions] = useState([]);
  const [locationOptions, setLocationOptions] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // Loading state for form submission
  const token = useSelector((state) => state.auth?.token);
  const [photo, setPhoto] = useState(null); // Single photo
  const [roomImages, setRoomImages] = useState([]); // For multiple room images
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Handle province change to update district options
  const handleProvinceChange = (e) => {
    const selectedProvince = e.target.value;
    setRoomData({
      ...roomData,
      province: selectedProvince,
      district: "",
      address: "",
    });

    const provinceData = LocationName.find(
      (loc) => loc.province === selectedProvince
    );
    if (provinceData) {
      setDistrictOptions(provinceData.districts || []);
      setLocationOptions([]); // Reset locations on province change
    }
  };

  // Handle district change to update location options
  const handleDistrictChange = (e) => {
    const selectedDistrict = e.target.value;
    setRoomData({ ...roomData, district: selectedDistrict, address: "" });

    const districtData = districtOptions.find(
      (dist) => dist.district === selectedDistrict
    );
    if (districtData) {
      setLocationOptions(districtData.locations || []);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "checkbox") {
      setRoomData({
        ...roomData,
        [name]: checked,
      });
    } else if (name === "photo") {
      setPhoto(files[0]); // Single photo
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
    setError("");

    if (!roomData.location_url) {
      setError("Location URL is required");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    Object.keys(roomData).forEach((key) => {
      formData.append(key, roomData[key]);
    });

    if (photo) {
      formData.append("photos", photo);
    }

    for (let i = 0; i < roomImages.length; i++) {
      formData.append("room_images", roomImages[i]);
    }

    try {
      const res = await postAddRoom(token, formData);
      console.log("res post add room data",res)
      navigate("/");
    } catch (error) {
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
          {/* Title */}
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

          {/* Description */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Description *
            </label>
            <textarea
              name="description"
              value={roomData.description}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2"
              placeholder="A cozy two-bedroom apartment with a kitchen."
              required
            />
          </div>

          {/* Price */}
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

          {/* Province */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Province *
            </label>
            <select
              name="province"
              value={roomData.province}
              onChange={handleProvinceChange}
              className="mt-1 block w-full border rounded-md p-2"
              required
            >
              <option value="">Select Province</option>
              {LocationName.map((loc) => (
                <option key={loc.province} value={loc.province}>
                  {loc.province}
                </option>
              ))}
            </select>
          </div>

          {/* District */}
          {districtOptions.length > 0 && (
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700">
                District *
              </label>
              <select
                name="district"
                value={roomData.district}
                onChange={handleDistrictChange}
                className="mt-1 block w-full border rounded-md p-2"
                required
              >
                <option value="">Select District</option>
                {districtOptions.map((dist) => (
                  <option key={dist.district} value={dist.district}>
                    {dist.district}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Address (Location) */}
          {locationOptions.length > 0 && (
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
                <option value="">Select Location</option>
                {locationOptions.map((loc) => (
                  <option key={loc.value} value={loc.value}>
                    {loc.label}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Sub Address */}
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

          {/* Google Maps URL */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Location URL (Google Maps) *
            </label>
            <input
              type="text"
              name="location_url"
              value={roomData.location_url}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-md p-2"
              placeholder="Paste Google Maps URL here"
              required
            />
          </div>

          {/* Other fields (has_electricity, has_wifi, etc.) */}
          {/* Add similar checkboxes and inputs as shown in your original code for other attributes */}
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

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-700"
              disabled={isLoading}
            >
              {isLoading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AddRoom;
