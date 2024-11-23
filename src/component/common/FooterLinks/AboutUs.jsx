import React from "react";
import Navbar from "../Navbar/Navbar";
const AboutUs = () => {
  return (
    <>
      <div className="mb-20">
        <Navbar />
      </div>
      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800">About Us</h1>
            <p className="mt-4 text-lg text-gray-600">
              Your trusted platform for finding and renting rooms with ease and
              comfort.
            </p>
          </div>

          {/* Content Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Image Section */}
            <div>
              <img
                src="https://via.placeholder.com/600x400"
                alt="About Us"
                className="rounded-lg shadow-lg w-full"
              />
            </div>

            {/* Text Section */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Who We Are
              </h2>
              <p className="text-gray-600 mb-4">
                At RoomRent, we are committed to connecting room seekers with
                hosts seamlessly. Our platform ensures that users find the
                perfect space to suit their needs while providing hosts with
                Link reliable and user-friendly way to list their properties.
              </p>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Our Mission
              </h2>
              <p className="text-gray-600 mb-4">
                We aim to revolutionize the way people rent rooms by offering
                transparency, security, and Link smooth experience for everyone
                involved.
              </p>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Why Choose Us?
              </h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Extensive listings across multiple cities.</li>
                <li>Secure and verified properties.</li>
                <li>24/7 customer support to assist you.</li>
                <li>Easy-to-use platform for both hosts and renters.</li>
              </ul>
            </div>
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Looking for Link place to stay or rent out your room?
            </h3>
            <p className="text-gray-600 mb-6">
              Join thousands of satisfied users who trust RoomRent to find their
              perfect space or the perfect tenant.
            </p>
            
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUs;