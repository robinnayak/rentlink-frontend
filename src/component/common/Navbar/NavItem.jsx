import React from "react";
import { Link } from "react-router-dom";

const NavItem = ({ text, link, onClose }) => {
  return (
    <Link
      to={link}
      onClick={onClose} // Trigger the onClose function when clicked
      className="text-white text-lg hover:text-yellow-500"
    >
      {text}
    </Link>
  );
};

export default NavItem;
