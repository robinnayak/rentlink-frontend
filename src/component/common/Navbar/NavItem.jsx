import React from "react";
import { Link } from "react-router-dom";

const NavItem = ({ text, link }) => {
  return (
    <Link to={link} className="text-white text-lg hover:text-yellow-500">
      {text}
    </Link>
  );
};

export default NavItem;
