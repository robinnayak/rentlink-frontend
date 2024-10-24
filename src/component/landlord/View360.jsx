import React, { useEffect } from "react";
import Navbar from "../common/Navbar/Navbar";
import * as PANOLENS from 'panolens'; // Import Panolens.js
import View360PanoromaImage from '../../photos/view360.jpg'; // Your 360 image

const View360 = () => {
  
  useEffect(() => {
    const panorama = new PANOLENS.ImagePanorama(View360PanoromaImage); // Use the image
    const viewer = new PANOLENS.Viewer({
      container: document.querySelector("#panorama-container"), // Container to mount the viewer
      autoRotate: true,
      autoRotateSpeed: 0.5,
    });

    viewer.add(panorama);

    // Cleanup on component unmount
    return () => {
      viewer.dispose();
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center mt-10">
        <h1 className="text-xl font-semibold mb-4">360° Room View</h1>
      </div>
      <div
        id="panorama-container"
        style={{ width: "100%", height: "500px", backgroundColor: "#000" }}
      ></div>
    </>
  );
};

export default View360;
