import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Image imports for slider (3 images used in the slider)
import Slider1 from "../assets/Slider (1).jpg";
import Slider2 from "../assets/Slider (2).jpg";
import Slider3 from "../assets/Slider (3).jpg";

// Array of images for the slider
const images = [Slider1, Slider2, Slider3];

const Landing = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0); // State to track the current image in the slider
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Automatically cycle through images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length); // Cycle through images
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  return (
    <div className="landing-page relative h-screen w-full overflow-hidden">
      {/* Image Slider */}
      <div className="absolute inset-0">
        <img
          src={images[currentImageIndex]} // Display the current image based on the index
          alt="Slider" // Alt text for accessibility
          className="object-cover w-full h-full transition-opacity duration-1000 ease-in-out" // Image transition and styling
        />
      </div>

      {/* Gradient Overlay for better text visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent opacity-85"></div>

      {/* Welcome Section with heading and description */}
      <div className="flex flex-col items-center justify-center h-full text-center p-4">
        <div className="relative z-10">
          <h1 className="text-white text-5xl lg:text-7xl font-bold tracking-wider drop-shadow-lg mb-4 animate-fade-in">
            Welcome to World Vision Lanka
          </h1>
          <h2 className="text-white text-3xl lg:text-5xl font-semibold tracking-wider drop-shadow-lg mb-6 animate-fade-in">
            Rideegama Area Programme
          </h2>
          <p className="text-white text-lg lg:text-2xl mb-8 drop-shadow-lg animate-fade-in">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book.
          </p>
        </div>

        {/* Icon Section with bouncing effect */}
        <div className="flex space-x-8 mb-8">
          {/* Heart Icon */}
          <div className="icon bg-orange-500 p-4 rounded-full shadow-lg transition-transform transform hover:animate-bounce animate-bounce">
            <i className="fas fa-heart text-white text-3xl"></i>
          </div>
          {/* Leaf Icon */}
          <div className="icon bg-green-500 p-4 rounded-full shadow-lg transition-transform transform hover:animate-bounce animate-bounce">
            <i className="fas fa-leaf text-white text-3xl"></i>
          </div>
          {/* Users Icon */}
          <div className="icon bg-blue-500 p-4 rounded-full shadow-lg transition-transform transform hover:animate-bounce animate-bounce">
            <i className="fas fa-users text-white text-3xl"></i>
          </div>
        </div>

        {/* Continue Button that navigates to the home page */}
        <button
          className="mt-4 px-8 py-3 bg-orange-500 text-white font-semibold rounded-lg shadow-lg hover:bg-orange-600 transition-all ease-in-out duration-300 transform hover:scale-105"
          onClick={() => navigate("/home")}
        >
          Continue
        </button>
      </div>

      {/* Custom Styles for animations */}
      <style jsx>{`
        @keyframes fade-in {
          0% {
            opacity: 0;
            transform: translateY(10px); // Start with slight downward position
          }
          100% {
            opacity: 1;
            transform: translateY(0); // End with no vertical translation
          }
        }
        .animate-fade-in {
          animation: fade-in 1.5s ease-out; // Fade-in effect for welcome text
        }

        @keyframes bounce {
          0%,
          20%,
          50%,
          80%,
          100% {
            transform: translateY(0); // Bouncing animation at different points
          }
          40% {
            transform: translateY(-10px); // Highest bounce point
          }
          60% {
            transform: translateY(-5px); // Mid-point bounce
          }
        }
        .animate-bounce {
          animation: bounce 2s infinite; // Continuous bounce animation for icons
        }
      `}</style>
    </div>
  );
};

export default Landing;
