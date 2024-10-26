// Settings.jsx
import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Sidebar from "./Sidebar";
import ContentSection from "./ContentSection";
import { useSelector } from "react-redux";

const Settings = () => {
  const user_type = useSelector((state) => state.auth.user_type); // user_type = Landlord or Leasee
  const token = useSelector((state) => state.auth?.token);
  const [activeSection, setActiveSection] = useState("profile");

  return (
    <>
      <div className="mb-6">
        <Navbar />
      </div>
      <div className="container mx-auto p-8 flex flex-col md:flex-row gap-6 pt-28">
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        <ContentSection activeSection={activeSection} user_type={user_type} token={token} />
      </div>
    </>
  );
};

export default Settings;
