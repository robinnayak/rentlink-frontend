import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { postDeposit } from "../../api/auth/request";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBillWave } from "@fortawesome/free-solid-svg-icons";
import { handleApiError } from "../../utils/ApiErrorHandle";

export const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth?.token);
  const { room_id, room_title } = location.state || {};
  const username = useSelector((state) => state.auth?.user?.first_name) || "Guest";
  
  const handlePayment = async () => {
    try {
      const res = await postDeposit(token, room_id);
      console.log(res.data);
    } catch (err) {
      const errorMessage = handleApiError(err);
      console.log("payment error", errorMessage);
    }
    navigate(-1); // Navigate back after payment
  };

  const handleCancel = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-300 via-blue-300 to-pink-300 p-4">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md transform transition-all duration-500 ease-in-out hover:scale-105 hover:shadow-2xl">
        <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
          Payment for Room: {room_title}
        </h1>
        <p className="mb-4 text-center text-lg text-gray-700">
          Username: <span className="font-semibold">{username}</span>
        </p>

        <p className="mb-6 text-center text-gray-600">
          <span className="font-semibold">Note:</span> The room map requires a one-time payment. Please contact the owner before your visit. This payment is valid until the room is no longer available. Currently, we are in a testing phase, so no payment methods have been added, and you can use this service free of charge for now.
        </p>

        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
            Amount (NRS)
          </label>
          <input
            type="text"
            id="amount"
            value="20"
            readOnly
            className="appearance-none border border-gray-300 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex flex-col space-y-4">
          <button
            onClick={handlePayment}
            className="flex items-center justify-center w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold py-2 px-4 rounded transition transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-300"
          >
            <FontAwesomeIcon icon={faMoneyBillWave} className="mr-2" />
            Pay 20 NRS
          </button>

          <button
            onClick={handleCancel}
            className="flex items-center justify-center w-full bg-gray-500 text-white font-bold py-2 px-4 rounded transition transform duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
