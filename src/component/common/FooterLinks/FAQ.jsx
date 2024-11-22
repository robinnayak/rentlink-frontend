import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How do I find a room on RoomRent?",
      answer:
        "You can browse our extensive listings by using the search bar on the homepage. Filter your search by location, price, and other preferences to find the perfect room.",
    },
    {
      question: "Is it free to create an account?",
      answer:
        "Yes, creating an account on RoomRent is completely free. Once registered, you can access all features, including browsing listings and contacting hosts.",
    },
    {
      question: "How do I list my room?",
      answer:
        "After signing up as a host, go to the 'List a Room' section, fill out the details, upload photos, and publish your listing for renters to see.",
    },
    {
      question: "Are the rooms verified?",
      answer:
        "We take verification seriously. While not all listings are verified, we encourage hosts to complete verification steps to ensure trust and transparency.",
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "Payment methods vary by host. Some accept cash payments, while others may require online transfers or payments via our platform. Check the listing details for specifics.",
    },
    {
      question: "Can I cancel a booking?",
      answer:
        "Yes, but cancellation policies vary by host. Make sure to review the host's cancellation policy before booking.",
    },
  ];

  const handleToggle = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <>
      <div className="mb-20">
        <Navbar />
      </div>

      <div className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-800">
              Frequently Asked Questions
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              Find answers to common questions about using RoomRent.
            </p>
          </div>

          {/* FAQ Section */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow p-4 border border-gray-200"
              >
                <button
                  onClick={() => handleToggle(index)}
                  className="w-full text-left text-xl font-semibold text-gray-800 flex justify-between items-center focus:outline-none"
                >
                  {faq.question}
                  <span>{activeIndex === index ? "-" : "+"}</span>
                </button>
                {activeIndex === index && (
                  <p className="text-gray-600 mt-4">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-12 text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Have more questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Contact our support team, and we'll be happy to assist you.
            </p>
            <a
              href="/contact"
              className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-500 transition duration-200"
            >
              Contact Support
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQ;
