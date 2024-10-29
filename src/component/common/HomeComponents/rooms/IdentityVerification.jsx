import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  getIdentityApi,
  postIdentityRoom,
  putIdentityRoom,
  deleteIdentityApi,
} from "../../../api/auth/request";
import { handleApiError } from "../../../utils/ApiErrorHandle";
import { MEDIA_URL } from "../../../api/base";
import Navbar from "../../Navbar/Navbar";

const IdentityVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { room_id, room_title, token } = location.state || {};
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  const [isloading, setIsLoading] = useState(false);
  const [identityData, setIdentityData] = useState({
    identity_image: null,
    is_verified: false,
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [refresh, setRefresh] = useState(false); // Refresh state

  const fetchVerificationData = async () => {
    setIsLoading(true);
    try {
      const res = await getIdentityApi(token, room_id);
      setIdentityData(res);
      setIsLoading(false);
      setError(null);
    } catch (error) {
      console.error("Identity fetch error:", error);
      setError(handleApiError(error));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchVerificationData();
    setRefresh(false); // Reset refresh after fetching data
  }, [token, room_id, refresh]);

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!image) {
      setError("Please upload an identity image.");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("identity_image", image);

    try {
      const res = await postIdentityRoom(token, room_id, formData);
      setSuccessMessage("Identity verification submitted successfully!");
      setIdentityData(res); // Update with the new response
      setError(null);
      setImage(null); // Reset image input
      setRefresh(true); // Set refresh to true to trigger re-fetch
    } catch (error) {
      console.error("Error posting identity verification:", error);
      setError(handleApiError(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = async () => {
    if (!image) {
      setError("Please upload a new identity image to update.");
      return;
    }

    setIsLoading(true);
    const formData = new FormData();
    formData.append("identity_image", image);

    try {
      const res = await putIdentityRoom(token, room_id, formData);
      setSuccessMessage("Identity verification updated successfully!");
      setIdentityData(res);
      setError(null);
      setImage(null); // Reset image input
      setRefresh(true); // Refresh to trigger re-fetch
    } catch (error) {
      console.error("Error updating identity verification:", error);
      setError(handleApiError(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    setIsLoading(true);

    try {
      await deleteIdentityApi(token, room_id);
      setSuccessMessage("Identity verification deleted successfully!");
      setIdentityData({ identity_image: null, is_verified: false });
      setError(null);
      setRefresh(true); // Refresh to trigger re-fetch
    } catch (error) {
      console.error("Error deleting identity verification:", error);
      setError(handleApiError(error));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(-1); // Go back to the previous page
  };

  const imageSource = identityData?.identity_image
    ? `${MEDIA_URL}${identityData.identity_image}`
    : null;

  return (
    <>
      <div className="mb-24">
        <Navbar />
      </div>
      <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-lg space-y-4 mt-8">
        <h2 className="text-2xl font-semibold text-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">
          Identity Verification for {room_title}
        </h2>

        {error && (
          <div className="text-red-600 text-center bg-red-200 p-2 rounded animate-pulse">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="text-green-600 text-center bg-green-200 p-2 rounded animate-pulse">
            {successMessage}
          </div>
        )}
        {identityData?.is_verified && (
          <div className="text-green-600 text-center bg-green-200 p-2 rounded animate-pulse">
          Contact details unlocked! You can now view them on the room details page. Please navigate back By Clicking On return button.
          </div>
        )}

        {isloading && (
          <div className="text-center text-blue-500 font-semibold animate-pulse">
            Loading...
          </div>
        )}
        {/* Display identity data if available */}
        {identityData && (
          <div className="space-y-4">
            {identityData.identity_image && (
              <img
                src={imageSource}
                alt="Identity Document"
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
            )}
            <div className="text-center text-lg font-semibold text-gray-700">
              Verification Status:{" "}
              <span
                className={`font-bold ${
                  identityData.is_verified ? "text-green-500" : "text-red-500"
                }`}
              >
                {identityData.is_verified ? "Verified" : "Not Verified"}
              </span>
            </div>
            {identityData.is_verified && (
              <div className="flex justify-between space-x-4 mt-4">
                <button
                  className="w-full bg-gradient-to-r from-blue-400 to-purple-500 text-white font-bold py-2 px-4 rounded transform hover:scale-105 transition duration-300"
                  onClick={handleEdit}
                  disabled={isloading}
                >
                  Edit
                </button>
                <button
                  className="w-full bg-gradient-to-r from-red-400 to-pink-500 text-white font-bold py-2 px-4 rounded transform hover:scale-105 transition duration-300"
                  onClick={handleDelete}
                  disabled={isloading}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        )}

        {/* Form to upload identity image */}
        <form className="mt-4 space-y-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-3 py-2 border rounded-lg shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          />
          {!identityData.is_verified && (
            <button
              type="button"
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white font-bold py-2 px-4 rounded transform hover:scale-105 transition duration-300 focus:outline-none"
              disabled={isloading}
            >
              Submit Identity
            </button>
          )}
        </form>

        <button
          onClick={handleCancel}
          className="w-full bg-gray-500 text-white font-bold py-2 px-4 rounded mt-4 transform hover:scale-105 transition duration-300 focus:outline-none"
        >
          Return
        </button>
      </div>
    </>
  );
};

export default IdentityVerification;
