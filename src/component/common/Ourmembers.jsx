import React from "react";
import MemberCard from "./MemberCard"; // Import reusable card component
import Navbar from "./Navbar/Navbar";
import MemberImage from "../../photos/member1.png"; // Adjust the image path accordingly
import MemberImage2 from "../../photos/member2.png"; // Adjust the image path accordingly
import MemberImage3 from "../../photos/member3.png"; // Adjust the image path accordingly
import { Helmet } from "react-helmet-async"; // Import Helmet for SEO

const OurMembers = () => {
  return (
    <>
      <Helmet>
        <title>Meet Our Members - RoomRentNepal</title>
        <meta
          name="description"
          content="Explore RoomRentNepal, your trusted platform for finding and renting rooms, featuring a unique map tool to help you easily locate and view available rooms in your desired area. Learn more about our mission, who we are, and why we are the best choice for your rental needs."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://roomrentnepal.com/members" />
        <meta property="og:title" content="Meet Our Members - RoomRentNepal" />
        <meta
          property="og:description"
          content="Explore RoomRentNepal, your trusted platform for finding and renting rooms, featuring a unique map tool to help you easily locate and view available rooms in your desired area. Learn more about our mission, who we are, and why we are the best choice for your rental needs."
        />
        <meta property="og:url" content="https://roomrentnepal.com/members" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content={MemberImage} />
        {/* JSON-LD for Organization */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "RoomRentNepal",
            "url": "https://roomrentnepal.com",
            "member": [
              {
                "@type": "Person",
                "name": "Robin Nayak",
                "role": "Owner & Developer",
                "email": "robinnayak86@gmail.com",
                "url": "https://www.linkedin.com/in/robin-nayak-1093371b6/",
              },
              {
                "@type": "Person",
                "name": "Sushant Nayak",
                "role": "Marketing Head & Partner",
                "email": "sushantsnayak1234@gmail.com",
                "url": "https://www.linkedin.com/in/robin-nayak-1093371b6/",
              },
              {
                "@type": "Person",
                "name": "Rakhee Pandey",
                "role": "Owner & Lead Developer, Graphics Designer",
                "email": "rakheepandey5712@gmail.com",
                "url": "https://www.linkedin.com/in/rakhee-pandey-2b497a220/",
              },
            ],
          })}
        </script>
      </Helmet>
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
            name="Sushant Nayak"
            role="Marketing Head & Partner"
            description="Dedicated to driving brand growth and market reach. Creative strategist with a keen eye for trends, always aiming to connect with audiences in innovative ways."
            MemberImage={MemberImage3}
            email="sushantsnayak1234@gmail.com"
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
