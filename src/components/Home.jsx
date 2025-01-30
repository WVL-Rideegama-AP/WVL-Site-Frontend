import React from "react";
import bannerImage from "../assets/image (4).jpg"; // Import banner image
import Tabs from "./Tabs"; // Import Tabs component
import PhotoGallery from "./Gallery/PhotoGallery"; // Import PhotoGallery component
import Contact from "./Contact"; // Import Contact component

const Home = () => {
  return (
    <div className="relative w-full h-auto">
      {/* Banner Background Image */}
      <img
        className="absolute w-full h-96 object-cover opacity-80" // Slight opacity to darken the banner
        src={bannerImage}
        alt="Banner"
      />

      {/* Overlay Content on Top of Banner */}
      <div className="relative z-10 flex flex-col items-center justify-center h-96 bg-black bg-opacity-50">
        <div className="text-center">
          <div className="font-josefin-sans font-semibold text-white text-5xl mb-4">
            World Vision Lanka
          </div>
          <div className="font-sans text-white text-xl">
            Rideegama Area Programme
          </div>
        </div>
      </div>

      {/* Tab Navigation Section */}
      <div className="relative z-20 mt-8 mb-4">
        <Tabs /> {/* Tabs component for navigation */}
      </div>

      {/* Photo Gallery Section */}
      <div className="pt-5">
        <PhotoGallery /> {/* Display a photo gallery */}
      </div>

      {/* Contact Section */}
      <div className="pt-5 pb-5">
        <Contact /> {/* Display contact form or details */}
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-6 transition-all duration-300 ease-in-out">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 Your Company. All rights reserved.</p>
          <p>
            <a
              href="https://example.com"
              className="text-gray-400 hover:text-white transition-colors duration-300 ease-in-out"
            >
              Privacy Policy
            </a>
            {" | "}
            <a
              href="https://example.com"
              className="text-gray-400 hover:text-white transition-colors duration-300 ease-in-out"
            >
              Terms of Service
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
