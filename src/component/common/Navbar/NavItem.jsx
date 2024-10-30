import React from "react";
import { Link } from "react-router-dom";

const NavItem = ({ text, link, onClose }) => {
  return (
    <Link
      to={link}
      onClick={onClose}
      className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-white text-lg font-semibold 
                 transition duration-300 ease-in-out transform hover:scale-105 hover:text-teal-400 relative
                 focus:outline-none "
    >
      {text}
      <span className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-teal-300 to-blue-500
                      transform transition-transform duration-300 ease-in-out scale-x-0 group-hover:scale-x-100">
      </span>
    </Link>
  );
};

export default NavItem;
