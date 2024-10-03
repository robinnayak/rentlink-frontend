import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import { useSelector } from "react-redux";
import { postContactUs } from "../../api/auth/request";
import { handleApiError } from "../../utils/ApiErrorHandle";

const ContactUs = () => {
  // State for the form fields and response handling

  const email =
    useSelector((state) => state.auth?.user?.email) || "example@email.com";
  const token = useSelector((state) => state.auth?.token);
  console.log("email", email);
  const [formData, setFormData] = useState({
    name: "",
    email: token ? email : "",
    subject: "",
    message: "",
  });

  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  // Handle form submission using Axios
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Send a POST request to the Django backend with Axios
    try {
      const response = postContactUs(formData);
      console.log("response from contact form",response)
      if (response) {
        setResponseMessage("Your message has been sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" }); // Reset the form
      } else {
        setError("Failed to send your message. Please try again.");
      }
    } catch (err) {
      const errormessage = handleApiError(error);
      setError(errormessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 py-12 px-4">
        <div className="container mx-auto bg-white rounded-lg shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
            Contact Us
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Organization's Contact Information */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-gray-700">
                Get In Touch
              </h2>
              <p className="text-gray-600">
                Feel free to reach out to us for any queries or assistance. We
                are always here to help.
              </p>
              <div>
                <h3 className="text-lg font-medium text-gray-700">Address</h3>
                <p className="text-gray-600">Sanga Banepa, Nayabasti</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-700">Phone</h3>
                <p className="text-gray-600">9815823670</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-700">Email</h3>
                <p className="text-gray-600">robinnayak86@gmail.com</p>
              </div>
            </div>

            {/* Query Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                    placeholder="Your Name"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                    placeholder="Your Email"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Subject
                  </label>
                  <select
                    id="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                    required
                  >
                    <option value="">Select Subject</option>
                    <option value="problem">Problem</option>
                    <option value="feedback">Feedback</option>
                    <option value="suggestion">Suggestion</option>
                    <option value="question">Question</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500"
                    rows="6"
                    placeholder="Type your message here"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white font-bold py-2 rounded-lg shadow hover:bg-blue-600 transition duration-300"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>

              {/* Success or Error Message */}
              {responseMessage && (
                <p className="text-green-600 mt-4">{responseMessage}</p>
              )}
              {error && <p className="text-red-600 mt-4">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
