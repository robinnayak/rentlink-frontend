// NavItem.js
import React from 'react';
import { Link } from 'react-router-dom';

const NavItem = ({ text, link }) => {
  return (
    <li className="mx-4">
      <Link to={link} className="text-white text-lg hover:text-yellow-500">
        {text}
      </Link>
    </li>
  );
};

export default NavItem;
