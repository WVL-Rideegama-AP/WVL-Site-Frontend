import React, { useEffect, useState, useCallback } from "react";
import { IoMdClose } from "react-icons/io";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useSwipeable } from "react-swipeable";

const GalleryComponent = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(null);

  const fetchImages = useCallback(async () => {
    setLoading(true);
    try {
      const apiUrl = process.env.REACT_APP_API_BASE_URL;
      if (!apiUrl) throw new Error("API URL is missing!");

      const response = await fetch(`${apiUrl}/gallery`);
      if (!response.ok)
        throw new Error(`Request failed with status ${response.status}`);

      const data = await response.json();
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

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

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
    <div className="relative w-full pb-5 flex flex-col items-center justify-center">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-semibold text-gray-800 mb-2">Gallery</h1>
        <p className="text-gray-600 text-lg">
          Click an image to view full size
        </p>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4 overflow-hidden">
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
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 overflow-hidden"
          {...swipeHandlers}
        >
          {/* Close Button */}
          <button
            className="absolute top-4 right-4 bg-white text-black rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-gray-300 transition"
            onClick={() => setSelectedIndex(null)}
          >
            <IoMdClose size={28} />
          </button>

          {/* Previous Button - Only visible on desktop */}
          <button
            className="absolute left-4 bg-white text-black rounded-full w-12 h-12 hidden md:flex items-center justify-center shadow-lg hover:bg-gray-300 transition"
            onClick={handlePrev}
          >
            <FaChevronLeft size={24} />
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

          {/* Next Button - Only visible on desktop */}
          <button
            className="absolute right-4 bg-white text-black rounded-full w-12 h-12 hidden md:flex items-center justify-center shadow-lg hover:bg-gray-300 transition"
            onClick={handleNext}
          >
            <FaChevronRight size={24} />
          </button>
        </div>
      )}
    </div>
  );
};

export default GalleryComponent;
