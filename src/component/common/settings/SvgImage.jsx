import React from "react";
import { createAvatar } from "@dicebear/core";
import { adventurer } from "@dicebear/collection";

const SvgImage = ({ seedName }) => {
  // Generate the avatar SVG as a string
  const avatar = createAvatar(adventurer, {
    seed: seedName,
    backgroundColor: ["#e0f7fa"], // Softer background color
    size: 150, // Larger size for emphasis
  }).toString();

  return (
    <div
      dangerouslySetInnerHTML={{ __html: avatar }}
      className=" rounded-3xl border-4 border-gray-300 shadow-2xl transform hover:scale-105 transition-transform duration-300 ease-in-out"
      aria-label="Generated avatar"
    />
  );
};

export default SvgImage;
