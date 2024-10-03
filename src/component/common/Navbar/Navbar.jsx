import React, { useState } from "react";
import {
  faBars,
  faTimes,
  faHome,
  faUsers,
  faEnvelope,
  faSignInAlt,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import Logo from "./Logo";
import NavItem from "./NavItem";
import ProfileDropdown from "./ProfileDropdown";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const token = useSelector((state) => state.auth?.token);
  const user_type = useSelector((state) => state.auth?.user_type);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo (Left) */}
        <div className="flex-shrink-0">
          <Logo />
        </div>

        {/* Navbar Links and Profile Dropdown (Right for Desktop) */}
        <div className="hidden lg:flex lg:space-x-6 items-center">
          <ul className="flex space-x-6 items-center">
            <NavItem text="Home" link="/" icon={faHome} />
            <NavItem text="Our Members" link="/members" icon={faUsers} />
            <NavItem text="Contact Us" link="/contact" icon={faEnvelope} />
            {user_type === "Landlord" && (
              <>
                <NavItem text="Add Room" link="/add-room" icon={faEnvelope} />
                <NavItem text="Manage Rooms" link="/manage-rooms" icon={faEnvelope} />
              </>
            )}
            {!token && (
              <>
                <NavItem text="Register" link="/register" icon={faUserPlus} />
                <NavItem text="Login" link="/login" icon={faSignInAlt} />
              </>
            )}
          </ul>

          {/* Profile Dropdown (Right) */}
          {token && <ProfileDropdown />}
        </div>

        {/* Hamburger Menu and ProfileDropdown for Mobile */}
        <div className="lg:hidden flex items-center space-x-4">
          {token && <ProfileDropdown />} {/* Profile Dropdown for Mobile */}
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isOpen ? (
              <FontAwesomeIcon icon={faTimes} size="lg" />
            ) : (
              <FontAwesomeIcon icon={faBars} size="lg" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <ul
        className={`lg:hidden bg-gray-800 text-white absolute right-0 top-16 w-full transition-transform duration-300 ease-in ${
          isOpen ? "transform translate-x-0" : "transform translate-x-full"
        }`}
      >
        <li className="p-4 border-b border-gray-700">
          <NavItem text="Home" link="/" icon={faHome} />
        </li>
        <li className="p-4 border-b border-gray-700">
          <NavItem text="Our Members" link="/members" icon={faUsers} />
        </li>
        <li className="p-4 border-b border-gray-700">
          <NavItem text="Contact Us" link="/contact" icon={faEnvelope} />
        </li>
        {user_type === "Landlord" && (
          <>
            <li className="p-4 border-b border-gray-700">
              <NavItem text="Add Room" link="/add-room" icon={faEnvelope} />
            </li>
            <li className="p-4 border-b border-gray-700">
              <NavItem text="Manage Rooms" link="/manage-rooms" icon={faEnvelope} />
            </li>
          </>
        )}
        {!token && (
          <>
            <li className="p-4 border-b border-gray-700">
              <NavItem text="Register" link="/register" icon={faUserPlus} />
            </li>
            <li className="p-4">
              <NavItem text="Login" link="/login" icon={faSignInAlt} />
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
