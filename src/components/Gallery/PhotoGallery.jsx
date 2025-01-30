import React, { useEffect, useState, useCallback } from "react";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";

const GalleryComponent = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(-1);

  const fetchImages = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/gallery");
      if (!response.ok) throw new Error("Failed to fetch images");
      const data = await response.json();

      const formattedImages = data.map((item) => ({
        src: item.image,
        thumbnail: item.image,
        caption: item.title,
        original: item.image,
        description: item.description,
      }));
      setImages(formattedImages);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages]);

  const handleClick = (index) => setIndex(index);
  const handleClose = () => setIndex(-1);
  const handleMovePrev = () =>
    setIndex((index + images.length - 1) % images.length);
  const handleMoveNext = () => setIndex((index + 1) % images.length);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[calc(80vh-200px)]">
        <div className="spinner-border animate-spin border-t-4 border-blue-500 rounded-full h-24 w-24"></div>
      </div>
    );
  }

  return (
    <div className="max-h-screen pb-5 flex flex-col items-center justify-center">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-semibold text-gray-800 mb-2">Gallery</h1>
        <p className="text-gray-600 text-lg">
          Click on an image to view it in full size
        </p>
      </div>

      <div className="w-full max-w-7xl mx-auto px-4">
        {/* CSS Grid Layout */}
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
                  src={image.thumbnail}
                  alt={image.caption}
                  className="w-full h-full object-cover cursor-pointer"
                  onClick={() => handleClick(index)}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {images[index] && (
        <Lightbox
          mainSrc={images[index].original}
          nextSrc={images[(index + 1) % images.length].original}
          prevSrc={images[(index + images.length - 1) % images.length].original}
          imageTitle={images[index].caption}
          imageCaption={images[index].description}
          onCloseRequest={handleClose}
          onMovePrevRequest={handleMovePrev}
          onMoveNextRequest={handleMoveNext}
        />
      )}
    </div>
  );
};

export default GalleryComponent;
