import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faCog, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { LogoutApi } from '../../api/auth/request';
import { setLogout } from '../../app/feature/authSlice';

const ProfileDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const username = useSelector(state => state.auth?.user?.first_name);
  const token = useSelector(state => state.auth?.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
    try {
      await LogoutApi(token); // Call the API to handle server-side logout
      dispatch(setLogout()); // Clear authentication state (Redux)
      navigate('/login'); // Redirect to the login page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="relative flex flex-col items-center">
      <FontAwesomeIcon
        icon={faUserCircle}
        className="text-white text-3xl cursor-pointer hover:text-teal-300 transition duration-300 ease-in-out"
        onClick={toggleDropdown}
      />
      <p className="text-white text-xs mt-1">{username}</p>
      {isOpen && (
        <ul className="absolute top-12 right-0 w-52 bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 
                       text-white rounded-lg shadow-lg py-2 z-50 transition duration-300 ease-in-out">
          <li className="flex items-center px-4 py-2 text-lg hover:bg-gray-600 transition-colors duration-300">
            <FontAwesomeIcon icon={faCog} className="mr-2 text-teal-300" />
            <Link to="/settings" className="text-white hover:text-teal-300">
              Settings
            </Link>
          </li>
          <li
            className="flex items-center px-4 py-2 text-lg hover:bg-gray-600 cursor-pointer transition-colors duration-300"
            onClick={handleLogout}
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2 text-red-400" />
            <span className="text-white hover:text-red-400">Logout</span>
          </li>
        </ul>
      )}
    </div>
  );
};

export default ProfileDropdown;
