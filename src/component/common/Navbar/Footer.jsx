import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faInstagram,
  faLinkedinIn,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone, faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6 md:px-12">
        {/* Main Sections */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Explore Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Explore</h3>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:underline text-gray-300">
                  Browse Listings
                </a>
              </li>
              <li>
                <a href="/about" className="hover:underline text-gray-300">
                  About Us
                </a>
              </li>
              <li>
                <a href="/faq" className="hover:underline text-gray-300">
                  FAQ
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:underline text-gray-300">
                  Contact Support
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Information Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <ul className="space-y-2">
              <li>
                <p>
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2" />
                  Kathmandu, Nepal
                </p>
              </li>
              <li>
                <p>
                  <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
                  <a href="mailto:rroom1528@gmail.com" className="hover:underline text-gray-300">
                    rroom1528@gmail.com
                  </a>
                </p>
              </li>
              <li>
                <p>
                  <FontAwesomeIcon icon={faPhone} className="mr-2" />
                  <a href="tel:+977-9815823670" className="hover:underline text-gray-300">
                    +977-9815823670
                  </a>
                </p>
              </li>
              <li>
                <p>
                  <FontAwesomeIcon icon={faWhatsapp} className="mr-2" />
                  <a
                    href="https://wa.me/9779815823670"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline text-gray-300"
                  >
                    +977-9815823670
                  </a>
                </p>
              </li>
            </ul>
          </div>

          {/* Social Media Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="hover:text-gray-400"
              >
                <FontAwesomeIcon icon={faFacebookF} size="lg" />
              </a>
              <a
                href="https://www.twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="hover:text-gray-400"
              >
                <FontAwesomeIcon icon={faTwitter} size="lg" />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="hover:text-gray-400"
              >
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="hover:text-gray-400"
              >
                <FontAwesomeIcon icon={faLinkedinIn} size="lg" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-4 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} RoomRent. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
