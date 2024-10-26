// ProfileForm.jsx
import React, { useEffect, useState } from "react";
import { LocationName } from "../../locations/LocationsName";

import {
  getLandlordProfile,
  getLeaseeProfile,
  putLandlordProfile,
  putLeaseeProfile,
} from "../../api/auth/request";
import { handleApiError } from "../../utils/ApiErrorHandle";
import { MEDIA_URL } from "../../api/base";
import SvgImage from "./SvgImage";

const ProfileForm = ({ user_type, token }) => {
  const [profileData, setProfileData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    contact_number: "",
    profile_image: null,
    province: "",
    district: "",
    address: "",
    sub_address: "",
  });
  const [selectedProvince, setSelectedProvince] = useState(
    profileData.province || ""
  );
  const [selectedDistrict, setSelectedDistrict] = useState(
    profileData.district || ""
  );
  const [loading, setLoading] = useState(false);
  const [flashMessage, setFlashMessage] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const res =
          user_type === "Landlord"
            ? await getLandlordProfile(token)
            : await getLeaseeProfile(token);
        console.log("res data", res);
        setProfileData(res);
        setSelectedProvince(res.province || "");
        setSelectedDistrict(res.district || "");
      } catch (error) {
        let api_error = handleApiError(error);
        setError(api_error);
      }
    };

    fetchProfileData();
  }, [user_type, token]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleProvinceChange = (e) => {
    const province = e.target.value;
    setSelectedProvince(province);
    handleProfileChange(e);
    setSelectedDistrict("");
  };

  const handleDistrictChange = (e) => {
    const district = e.target.value;
    setSelectedDistrict(district);
    handleProfileChange(e);
  };

  const handleImageChange = (e) => {
    setProfileData((prevData) => ({
      ...prevData,
      profile_image: e.target.files[0] || null,
    }));
  };
  const profile_image_link = profileData.profile_image
    ? `${MEDIA_URL}${profileData.profile_image}`
    : null;
  console.log("profile image", profileData.profile_image);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { profile_image, ...profileDataWithoutImage } = profileData;
    let payload;

    if (profile_image instanceof File) {
      payload = new FormData();
      Object.keys(profileDataWithoutImage).forEach((key) =>
        payload.append(key, profileDataWithoutImage[key])
      );
      payload.append("profile_image", profile_image);
    } else {
      payload = profileDataWithoutImage;
    }

    try {
      const res =
        user_type === "Landlord"
          ? await putLandlordProfile(token, payload)
          : await putLeaseeProfile(token, payload);

      // Assuming `res` includes the image URL after uploading
      setProfileData((prevData) => ({
        ...prevData,
        profile_image: res.profile_image, // Update with new URL
      }));

      setFlashMessage("Profile updated successfully");
      setTimeout(() => setFlashMessage(""), 3000);
    } catch (error) {
      setError(handleApiError(error));
    } finally {
      setLoading(false);
    }
  };

  const selectedProvinceData = LocationName.find(
    (p) => p.province === selectedProvince
  );
  const selectedDistrictData = selectedProvinceData?.districts.find(
    (d) => d.district === selectedDistrict
  );

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
      {flashMessage && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          {flashMessage}
        </div>
      )}

      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {/* Profile Image Display */}
      <div className="flex justify-center mb-6">
        {profile_image_link ? (
          // Display the uploaded profile image if available
          <img
            src={profile_image_link}
            alt="Profile"
            className="w-32 h-32 rounded-full border-4 border-gray-300 shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out"
          />
        ) : (
          // Display the generated SVG avatar if no profile image is available
          <SvgImage
            seedName={`${profileData.first_name} ${profileData.last_name}`}
          />
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="first_name">
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={profileData.first_name || ""}
              onChange={handleProfileChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="First Name"
            />
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="last_name">
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={profileData.last_name || ""}
              onChange={handleProfileChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Last Name"
            />
          </div>

          {/* Email (disabled) */}
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={profileData.email || ""}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Email"
              disabled
            />
          </div>

          {/* Contact Number (numeric only) */}
          <div>
            <label
              className="block text-gray-700 mb-2"
              htmlFor="contact_number"
            >
              Contact Number
            </label>
            <input
              type="number"
              id="contact_number"
              name="contact_number"
              value={profileData.contact_number || ""}
              onChange={handleProfileChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Contact Number"
            />
          </div>

          {/* Province */}
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="province">
              Province
            </label>
            <select
              id="province"
              name="province"
              value={selectedProvince}
              onChange={handleProvinceChange}
              className="w-full p-3 border border-gray-300 rounded-md"
            >
              <option value="">Select Province</option>
              {LocationName.map((p) => (
                <option key={p.province} value={p.province}>
                  {p.province}
                </option>
              ))}
            </select>
          </div>

          {/* District */}
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="district">
              District
            </label>
            <select
              id="district"
              name="district"
              value={selectedDistrict}
              onChange={handleDistrictChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              disabled={!selectedProvince}
            >
              <option value="">Select District</option>
              {selectedProvinceData?.districts.map((d) => (
                <option key={d.district} value={d.district}>
                  {d.district}
                </option>
              ))}
            </select>
          </div>

          {/* Address */}
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="address">
              Address
            </label>
            <select
              id="address"
              name="address"
              value={profileData.address || ""}
              onChange={handleProfileChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              disabled={!selectedDistrict}
            >
              <option value="">Select Address</option>
              {selectedDistrictData?.locations.map((location) => (
                <option key={location.value} value={location.value}>
                  {location.label}
                </option>
              ))}
            </select>
          </div>

          {/* Profile Image */}
          {/* <div>
            <label className="block text-gray-700 mb-2" htmlFor="profile_image">
              Profile Image
            </label>
            <input
              type="file"
              id="profile_image"
              name="profile_image"
              onChange={handleImageChange}
              className="w-full p-3 border border-gray-300 rounded-md"
            />
          </div> */}

          {/* Conditional fields for Landlord */}
          {user_type === "Landlord" && (
            <div>
              <label className="block text-gray-700 mb-2" htmlFor="sub_address">
                Sub Address
              </label>
              <input
                type="text"
                id="sub_address"
                name="sub_address"
                value={profileData.sub_address || ""}
                onChange={handleProfileChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="Sub Address"
              />
            </div>
          )}

          {/* Conditional fields for Leasee */}
          {user_type === "Leasee" && (
            <div>
              <label
                className="block text-gray-700 mb-2"
                htmlFor="preferred_location"
              >
                Preferred Location
              </label>
              <input
                type="text"
                id="preferred_location"
                name="preferred_location"
                value={profileData.preferred_location || ""}
                onChange={handleProfileChange}
                className="w-full p-3 border border-gray-300 rounded-md"
                placeholder="Preferred Location"
              />
            </div>
          )}
        </div>

        <button
          type="submit"
          className={`bg-primary-btn hover:bg-primary-btn-dark text-white font-bold py-2 my-2 px-4 rounded focus:outline-none focus:shadow-outline w-1/3 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Saving..." : "Save Change"}
        </button>
      </form>
    </div>
  );
};

export default ProfileForm;
