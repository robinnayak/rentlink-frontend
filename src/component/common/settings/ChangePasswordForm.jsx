// ChangePasswordForm.jsx
import React, { useState } from "react";

const ChangePasswordForm = () => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");
  const [passwordValidation, setPasswordValidation] = useState({
    hasUppercase: false,
    hasNumber: false,
    hasSpecialChar: false,
    hasMinLength: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    if (name === "newPassword") {
      validatePassword(value);
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

  const checkPasswordsMatch = () => {
    return formData.newPassword === formData.confirmPassword;
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

    setPasswordError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    alert(
      `This site is under maintenance. Your provided data: ${JSON.stringify(
        formData
      )}`
    );
    console.log("Password change request:", formData);
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Change Password
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="currentPassword">
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Current Password"
            />
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="newPassword">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="New Password"
            />
            <small className="text-sm text-gray-500">
              Password must include at least 9 characters, one uppercase letter,
              one number, and one special character.
            </small>
          </div>
          {/* Password validation feedback */}
          <div className="mb-4 text-sm text-gray-500 flex space-x-2">
            <span className={`${passwordValidation.hasUppercase ? "text-green-500" : "text-gray-500"}`}>
              A-Z
            </span>
            <span className={`${passwordValidation.hasNumber ? "text-green-500" : "text-gray-500"}`}>
              0-9
            </span>
            <span className={`${passwordValidation.hasSpecialChar ? "text-green-500" : "text-gray-500"}`}>
              @, #, !
            </span>
            <span className={`${passwordValidation.hasMinLength ? "text-green-500" : "text-gray-500"}`}>
              9+ chars
            </span>
          </div>
          <div>
            <label className="block text-gray-700 mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
              placeholder="Confirm Password"
            />
          </div>
          {passwordError && <p className="text-red-500">{passwordError}</p>}
        </div>
        <button
          type="submit"
          className="mt-6 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
        >
          Change Password
        </button>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
