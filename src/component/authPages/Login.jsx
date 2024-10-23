import React, { useState } from "react";
import { useDispatch } from "react-redux"; // Import useDispatch from redux
import { postLoginApi } from "../api/auth/request";
import { useNavigate, Link } from "react-router-dom"; // Import Link from react-router-dom
import { setToken, setUser } from "../app/feature/authSlice";
import { handleApiError } from "../utils/ApiErrorHandle";
import Cookies from "js-cookie";
import ApiErrors from "../common/ApiErrors";
import Navbar from "../common/Navbar/Navbar";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize dispatch
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const [isLoading, setIsLoading] = useState(false); // New loading state

  const submitLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    try {
      const res = await postLoginApi(formData); // Assuming the API response includes a token
      console.log("Login successful:", res.access);
      console.log("Login successful:", res.user);

      // Dispatch action to store token in Redux
      dispatch(setToken(res.access));
      dispatch(setUser(res.user));

      // Store token and email in cookies with expiration of 7 days
      Cookies.set("token", res.access, { expires: 7 });
      Cookies.set("email", res.user.email, { expires: 7 });

      // Navigate to the home page after successful login
      navigate("/");
    } catch (error) {
      const apierrors = handleApiError(error);
      setError(apierrors);
      console.error("Login error", apierrors);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navbar />

    <div className="flex justify-center items-center h-screen bg-primary-bg">
      <form
        onSubmit={submitLogin}
        className="bg-white shadow-lg rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md"
      >
        <h1 className="text-2xl font-bold mb-6 text-center text-primary-text">
          Login
        </h1>
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
        <div className="mb-6">
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
        <button
          type="submit"
          className={`bg-primary-btn hover:bg-primary-btn-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"} {/* Show loading text */}
        </button>
        <ApiErrors error={error} />
        <div className="text-center mt-4">
          <p className="text-primary-text">
            Don't have an account?{" "}
            <Link to="/register" className="text-primary-btn hover:underline">
              Register here
            </Link>
          </p>
        </div>
      </form>
      {/* Display error message if any */}
    </div>
    </>
  );
};

export default Login;
