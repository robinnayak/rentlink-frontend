// OurMembers.js
import React from "react";
import MemberCard from "./MemberCard"; // Import reusable card component
import Navbar from "./Navbar/Navbar";
import MemberImage from "../../photos/member1.png"; // Adjust the image path accordingly
import MemberImage2 from "../../photos/member2.png"; // Adjust the image path accordingly

const OurMembers = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 py-12 pt-24">
        <h1 className="text-4xl text-center text-white font-bold mb-20">
          Meet Our Members
        </h1>
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Updated member details for Robin Nayak */}
          <MemberCard
            name="Robin Nayak"
            role="Owner & Developer"
            description="Highly motivated to develop solutions that benefit society. Passionate about leveraging technology to create impactful and user-friendly applications."
            MemberImage={MemberImage}
            email="robinnayak86@gmail.com"
            linkedin="https://www.linkedin.com/in/robin-nayak-1093371b6/"
          />
          <MemberCard
            name="Rakhee Pandey"
            role="Owner & Lead Developer, Graphics Designer"
            description="Passionate about creating impactful, user-friendly solutions that benefit society. Energetic, creative, and always ready to help, combines technical prowess with artistic flair."
            MemberImage={MemberImage2}
            email="rakheepandey5712@gmail.com"
            linkedin="https://www.linkedin.com/in/rakhee-pandey-2b497a220/"
          />
        </div>
      </div>
    </>
  );
};

export default OurMembers;
