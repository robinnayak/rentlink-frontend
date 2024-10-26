// ContentSection.jsx
import React from "react";
import ProfileForm from "./ProfileForm";
import ChangePasswordForm from "./ChangePasswordForm";

const ContentSection = ({ activeSection, user_type, token }) => {
  return (
    <div className="w-full md:w-3/4 bg-white p-6 shadow-md rounded-lg">
      {activeSection === "profile" && <ProfileForm user_type={user_type} token={token} />}
      {activeSection === "changePassword" && <ChangePasswordForm />}
    </div>
  );
};

export default ContentSection;
