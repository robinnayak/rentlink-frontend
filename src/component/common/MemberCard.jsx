import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"; // Import FontAwesomeIcon
import { faEnvelope } from "@fortawesome/free-solid-svg-icons"; // Import icons
import { faLinkedin } from "@fortawesome/free-brands-svg-icons"; // LinkedIn icon

const MemberCard = ({
  name,
  role,
  description,
  MemberImage,
  email,
  linkedin,
}) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 transform transition-all hover:scale-105 hover:shadow-xl duration-300 ease-in-out relative w-104 mx-5">
      {/* Center the card and adjust width and height */}

      {/* Image section */}
      <div className="relative mb-4 flex justify-center -mt-16">
        <div className="relative w-48 h-48 overflow-hidden rounded-full border-4 border-white shadow-lg bg-gray-100">
          <img
            src={MemberImage}
            alt={name}
            className="w-full h-full object-cover rounded-full transform transition-transform duration-300 ease-in-out hover:scale-110"
          />
          {/* FontAwesome icon overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 rounded-full transition-opacity duration-300">
            {/* You can add another icon overlay here if desired */}
          </div>
        </div>
      </div>

      {/* Text section */}
      <div className="ml-4">
        {" "}
        {/* Added left margin */}
        <h2 className="text-xl font-bold text-gray-800 mb-2 text-center">
          {name}
        </h2>
        <h3 className="text-lg text-gray-600 mb-1 text-center">{role}</h3>
        <p className="text-gray-600 mb-4 text-center">{description}</p>
      </div>

      {/* Contact Information */}
      <div className="text-center">
        {/* Email */}
        <a
          href={`mailto:${email}`}
          className="text-blue-500 hover:underline flex items-center justify-center"
        >
          <FontAwesomeIcon icon={faEnvelope} className="mr-2 text-gray-600" />
          {email}
        </a>

        {/* LinkedIn Profile */}
        <div className="mt-4 flex items-center justify-center">
          <FontAwesomeIcon icon={faLinkedin} className="mr-2 text-blue-600" />

          <a
            href={linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            LinkedIn Profile
          </a>
        </div>
      </div>
    </div>
  );
};

export default MemberCard;
