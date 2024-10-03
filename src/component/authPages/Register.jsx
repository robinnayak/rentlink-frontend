import React, { useState } from "react";
import { postRegisterAPI } from "../api/auth/request";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    password: "",
    password2: "",
    is_landowner: false,
    contact_number: "",
  });
  const [isLoading, setIsLoading] = useState(false); // New loading state

  const navigation = useNavigate()
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const submitUser = async (e) => {
    e.preventDefault();
    setIsLoading(true)
    try {
      const res = await postRegisterAPI(formData);
      console.log("Registration Successful:", res);
        navigation("/login")
    } catch (error) {
      console.error("Error registering user:", error);
    }
    finally{
      setIsLoading(false)
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-primary-bg">
      <form
        onSubmit={submitUser}
        className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-primary-text">
          Register
        </h1>
        <div className="mb-4">
          <label className="block text-primary-text text-sm font-bold mb-2">
            First Name
          </label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-primary-text leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-primary-text text-sm font-bold mb-2">
            Last Name
          </label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-primary-text leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-primary-text text-sm font-bold mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-primary-text leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-primary-text text-sm font-bold mb-2">
            Contact Number
          </label>
          <input
            type="text"
            name="contact_number"
            value={formData.contact_number}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-primary-text leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-primary-text text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-primary-text leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-primary-text text-sm font-bold mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            name="password2"
            value={formData.password2}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-primary-text leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-primary-text text-sm font-bold mb-2">
            Are you a landowner?
          </label>
          <input
            type="checkbox"
            name="is_landowner"
            checked={formData.is_landowner}
            onChange={handleChange}
            className="mr-2 leading-tight"
          />
        </div>
        <button
          type="submit"
          className={`bg-primary-btn hover:bg-primary-btn-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
        {isLoading ? "Submiting..." : "Register"} {/* Show loading text */}
        </button>
      </form>
    </div>
  );
};

export default Register;
