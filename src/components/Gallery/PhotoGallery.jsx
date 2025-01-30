import React, { useEffect, useState, useCallback } from "react";
import { IoMdClose, IoMdArrowBack, IoMdArrowForward } from "react-icons/io"; // Using React Icons (MUI Alternative)

const GalleryComponent = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const fetchImages = useCallback(async () => {
    setLoading(true);
    try {
      const apiUrl = process.env.REACT_APP_API_BASE_URL;

      if (!apiUrl) throw new Error("API URL is missing!");

      const fullUrl = `${apiUrl}/gallery`;
      console.log("Fetching from:", fullUrl);

      const response = await fetch(fullUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Response Status:", response.status);

      if (!response.ok)
        throw new Error(`Request failed with status ${response.status}`);

      const data = await response.json();
      console.log("Fetched Data:", data);

      setImages(
        data.map((item) => ({
          src: item.image,
          caption: item.title,
          description: item.description,
        }))
      );
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleNext = useCallback(() => {
    setSelectedIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const handlePrev = useCallback(() => {
    setSelectedIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedIndex === null) return;
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape") setSelectedIndex(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedIndex, handleNext, handlePrev]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(80vh-200px)]">
        <div className="spinner-border animate-spin border-t-4 border-gray-500 rounded-full h-24 w-24"></div>
      </div>
    );
  }

  return (
    <div className="max-h-screen pb-5 flex flex-col items-center justify-center">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-semibold text-gray-800 mb-2">Gallery</h1>
        <p className="text-gray-600 text-lg">
          Click an image to view full size
        </p>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4">
        {images.length === 0 ? (
          <div className="flex items-center justify-center space-x-2 p-32">
            <span className="text-4xl text-red-500">!</span>
            <span className="text-lg text-gray-600">No data available</span>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative w-full h-64 bg-gray-200 rounded-lg overflow-hidden"
              >
                <img
                  src={image.src}
                  alt={image.caption}
                  className="w-full h-full object-cover cursor-pointer transition-transform duration-200 hover:scale-105"
                  onClick={() => setSelectedIndex(index)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {selectedIndex !== null && images[selectedIndex] && (
        <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
          {/* Close Button */}
          <button
            className="absolute top-6 right-6 text-white rounded-full w-12 h-12 border border-white flex items-center justify-center hover:bg-white hover:text-black transition"
            onClick={() => setSelectedIndex(null)}
          >
            <IoMdClose size={28} />
          </button>

          {/* Previous Button */}
          <button
            className="absolute left-10 top-1/2 transform -translate-y-1/2 text-white rounded-full w-12 h-12 border border-white flex items-center justify-center hover:bg-white hover:text-black transition"
            onClick={handlePrev}
          >
            <IoMdArrowBack size={28} />
          </button>

          {/* Image Display */}
          <div className="max-w-3xl p-4 text-center">
            <img
              src={images[selectedIndex].src}
              alt={images[selectedIndex].caption}
              className="max-h-[80vh] w-auto mx-auto rounded-lg shadow-lg"
            />
            <h2 className="text-white text-2xl mt-4">
              {images[selectedIndex].caption}
            </h2>
            <p className="text-gray-300 text-lg mt-2">
              {images[selectedIndex].description}
            </p>
          </div>

          {/* Next Button */}
          <button
            className="absolute right-10 top-1/2 transform -translate-y-1/2 text-white rounded-full w-12 h-12 border border-white flex items-center justify-center hover:bg-white hover:text-black transition"
            onClick={handleNext}
          >
            <IoMdArrowForward size={28} />
          </button>
        </div>
      )}
    </div>
  );
};

export default GalleryComponent;
