import React from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { postDeposit } from "../../api/auth/request";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoneyBillWave } from "@fortawesome/free-solid-svg-icons";

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
      console.log(err);
    }
    navigate(-1); // Navigate back after payment
  };

  const handleCancel = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Payment for Room: {room_title}
        </h1>
        <p className="mb-4 text-center">Username: {username}</p>

        <div className="mb-4">
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
            className="flex items-center justify-center w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
          >
            <FontAwesomeIcon icon={faMoneyBillWave} className="mr-2" />
            Pay 20 NRS
          </button>

          <button
            onClick={handleCancel}
            className="flex items-center justify-center w-full bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-700 focus:outline-none focus:shadow-outline"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};
