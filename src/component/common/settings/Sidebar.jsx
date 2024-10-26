// Sidebar.jsx
import React from "react";

const Sidebar = ({ activeSection, setActiveSection }) => {
  const sections = [
    { id: "profile", label: "Profile" },
    { id: "changePassword", label: "Change Password" },
  ];

  return (
    <div className="w-full md:w-1/4 bg-gray-100 p-4 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold mb-4">Settings</h2>
      <ul className="space-y-2">
        {sections.map((section) => (
          <li key={section.id}>
            <button
              onClick={() => setActiveSection(section.id)}
              className={`w-full text-left p-2 rounded-md transition-colors duration-300 ${
                activeSection === section.id ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-200"
              }`}
            >
              {section.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
