import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
const Settings = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log("Form submitted:", formData);
  };

  return (
    <>
    <Navbar/>
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">
          Settings (“This Page is Under Maintenance. The Site is Currently
          Unavailable.”)
        </h1>

        {/* Update Profile Section */}
        <div className="bg-white p-6 shadow-md rounded-lg mb-8">
          <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-gray-700 mb-2" htmlFor="firstName">
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  placeholder="First Name"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2" htmlFor="lastName">
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  placeholder="Last Name"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2" htmlFor="email">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  placeholder="Email"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
            >
              Save Changes
            </button>
          </form>
        </div>

        {/* Change Password Section */}
        <div className="bg-white p-6 shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  className="block text-gray-700 mb-2"
                  htmlFor="currentPassword"
                >
                  Current Password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  name="currentPassword"
                  value={formData.currentPassword}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  placeholder="Current Password"
                />
              </div>

              <div>
                <label
                  className="block text-gray-700 mb-2"
                  htmlFor="newPassword"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  placeholder="New Password"
                />
              </div>

              <div>
                <label
                  className="block text-gray-700 mb-2"
                  htmlFor="confirmPassword"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-md"
                  placeholder="Confirm Password"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-6 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
            >
              Change Password
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Settings;
