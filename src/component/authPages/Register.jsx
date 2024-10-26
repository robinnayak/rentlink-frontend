import React, { useState } from "react";
import { postRegisterAPI } from "../api/auth/request";
import { useNavigate } from "react-router-dom";
import { handleApiError } from "../utils/ApiErrorHandle";
import Navbar from "../common/Navbar/Navbar";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "", // Optional field
    password: "",
    password2: "",
    is_landowner: true, // Default to landlord, can be toggled
    contact_number: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [role, setRole] = useState("landowner"); // Track role
  const [flash, setFlash] = useState(false);
  const [passwordError, setPasswordError] = useState(""); // Password validation state
  const [passwordValidation, setPasswordValidation] = useState({
    hasUppercase: false,
    hasNumber: false,
    hasSpecialChar: false,
    hasMinLength: false,
  });
  const [phoneError, setPhoneError] = useState(""); // Phone validation state

  const navigate = useNavigate();

  const handleRoleChange = (role) => {
    setRole(role);
    setFlash(true);
    setTimeout(() => setFlash(false), 300);
    setFormData({
      ...formData,
      is_landowner: role === "landowner",
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "password") {
      validatePassword(value);
    }

    if (name === "contact_number") {
      validatePhoneNumber(value);
    }
  };

  const validatePassword = (password) => {
    // Real-time password validation
    setPasswordValidation({
      hasUppercase: /[A-Z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      hasMinLength: password.length >= 9,
    });
  };

  const validatePhoneNumber = (phone) => {
    const phonePattern = /^\d{0,10}$/;
    if (!phonePattern.test(phone)) {
      setPhoneError("Phone number must be exactly 10 digits.");
    } else {
      setPhoneError("");
    }
    setFormData({
      ...formData,
      contact_number: phone,
    });
  };

  const checkPasswordsMatch = () => {
    const { password, password2 } = formData;
    return password === password2;
  };

  const validateForm = () => {
    const { hasUppercase, hasNumber, hasSpecialChar, hasMinLength } =
      passwordValidation;

    if (!checkPasswordsMatch()) {
      setPasswordError("Passwords do not match.");
      return false;
    }

    if (!hasUppercase || !hasNumber || !hasSpecialChar || !hasMinLength) {
      setPasswordError("Password does not meet the required criteria.");
      return false;
    }

    if (formData.contact_number.length !== 10) {
      setPhoneError("Phone number must be exactly 10 digits.");
      return false;
    }

    setPasswordError("");
    setPhoneError("");
    return true;
  };

  const submitUser = async (e) => {
    e.preventDefault();
    if (!validateForm()) return; // Validate form before submitting
    setIsLoading(true);
    try {
      const res = await postRegisterAPI(formData);
      console.log("Registration Successful:", res);
      navigate("/login");
    } catch (error) {
      let api_error = handleApiError(error);
      setError(api_error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="mb-4">
        <Navbar />
      </div>

      <div className="flex justify-center items-center h-screen bg-primary-bg pt-28">
        {error && <p className="text-red-500">{error}</p>}
        <form
          onSubmit={submitUser}
          className="bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 w-full max-w-md"
        >
          <h1 className="text-2xl font-bold mb-6 text-center text-primary-text">
            {role === "landowner" ? "Landlord" : "Room Finder"} Registration
          </h1>

          {/* Role selection with flash animation */}
          <div className="flex justify-center mb-6">
            <button
              type="button"
              className={`px-4 py-2 mr-4 rounded-lg transition-all duration-300 ${
                role === "landowner"
                  ? "bg-primary-btn text-white"
                  : "bg-gray-200"
              } ${flash ? "animate-flash" : ""} rounded-lg`}
              onClick={() => handleRoleChange("landowner")}
            >
              Landlord
            </button>
            <button
              type="button"
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                role === "room_finder"
                  ? "bg-primary-btn text-white"
                  : "bg-gray-200"
              } ${flash ? "animate-flash" : ""} rounded-lg`}
              onClick={() => handleRoleChange("room_finder")}
            >
              Room Finder
            </button>
          </div>

          {/* First Name */}
          <div className="mb-4">
            <label className="block text-primary-text text-sm font-bold mb-2">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
              className="shadow border rounded w-full py-2 px-3 text-primary-text focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label className="block text-primary-text text-sm font-bold mb-2">
              Last Name <span className="text-gray-500">(Optional)</span>
            </label>
            <input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
              className="shadow border rounded w-full py-2 px-3 text-primary-text focus:outline-none focus:shadow-outline"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="block text-primary-text text-sm font-bold mb-2">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="shadow border rounded w-full py-2 px-3 text-primary-text focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          {/* Contact Number */}
          <div className="mb-4">
            <label className="block text-primary-text text-sm font-bold mb-2">
              Contact Number{" "}
              <span className="text-red-500 text-xs">
                * This number will be visible in the site.
              </span>
            </label>
            <input
              type="number"
              name="contact_number"
              value={formData.contact_number}
              onChange={handleChange}
              className="shadow-sm border border-gray-300 rounded-lg w-full py-2 px-3 text-primary-text focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              required
              maxLength={10}
              pattern="\d*"
              placeholder="Enter 10 digit phone number"
            />
            {phoneError && <p className="text-red-500 text-xs">{phoneError}</p>}
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-primary-text text-sm font-bold mb-2">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="shadow border rounded w-full py-2 px-3 text-primary-text focus:outline-none focus:shadow-outline"
              required
            />
            <small className="text-sm text-gray-500">
              Password must include at least 9 characters, one uppercase letter,
              one number, and one special character.
            </small>
          </div>

          {/* Password validation feedback */}
          <div className="mb-4 text-sm text-gray-500">
            <span
              className={`${
                passwordValidation.hasUppercase ? "text-green-500" : ""
              }`}
            >
              A-Z
            </span>
            ,
            <span
              className={`${
                passwordValidation.hasNumber ? "text-green-500" : ""
              }`}
            >
              0-9
            </span>
            ,
            <span
              className={`${
                passwordValidation.hasSpecialChar ? "text-green-500" : ""
              }`}
            >
              @, #, !
            </span>
            ,
            <span
              className={`${
                passwordValidation.hasMinLength ? "text-green-500" : ""
              }`}
            >
              9+ chars
            </span>
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="block text-primary-text text-sm font-bold mb-2">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              name="password2"
              value={formData.password2}
              onChange={handleChange}
              className="shadow border rounded w-full py-2 px-3 text-primary-text focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          {passwordError && <p className="text-red-500">{passwordError}</p>}

          <button
            type="submit"
            className={`bg-primary-btn hover:bg-primary-btn-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full ${
              isLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Register"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Register;
