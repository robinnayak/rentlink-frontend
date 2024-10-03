import React from "react";
import { Link } from "react-router-dom";
import LogoImage from "../../../photos/logo1.jpg";

const Logo = () => {
  return (
    <div className="flex items-center">
      {/* Wrapping the logo image in a Link component */}
      <Link to="/">
        <img src={LogoImage} alt="Logo" className="h-12" />
      </Link>
    </div>
  );
};

export default Logo;
