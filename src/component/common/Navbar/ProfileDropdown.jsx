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
        className="text-white text-3xl cursor-pointer"
        onClick={toggleDropdown}
      />
      <p className="text-white text-xs mt-1">{username}</p>
      {isOpen && (
        <ul className="absolute top-7 right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg py-2 z-50">
          <li className="px-4 py-2 hover:bg-gray-100 hover:text-gray-800 cursor-pointer">
            <FontAwesomeIcon icon={faCog} className="mr-2" />
            <Link to="/settings">Settings</Link>
          </li>
          <li
            className="px-4 py-2 hover:bg-gray-100 hover:text-gray-800 cursor-pointer"
            onClick={handleLogout}
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
            Logout
          </li>
        </ul>
      )}
    </div>
  );
};

export default ProfileDropdown;
