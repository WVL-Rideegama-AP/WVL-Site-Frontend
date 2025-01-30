import React, { useEffect, useState, useCallback } from "react";

const ImageTable = ({ onEdit, refreshTable }) => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch images from the API
  const fetchImages = useCallback(async () => {
    setLoading(true); // Set loading to true when fetching starts
    try {
      const response = await fetch(`http://localhost:5000/gallery`);
      if (!response.ok) throw new Error("Failed to fetch images");
      const jsonData = await response.json();
      setImages(jsonData);
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false); // Set loading to false after fetching completes
    }
  }, []);

  useEffect(() => {
    fetchImages();
  }, [fetchImages, refreshTable]);

  // Delete an image by ID
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;
    try {
      const response = await fetch(`http://localhost:5000/gallery/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete image");
      alert("Image deleted successfully!");
      fetchImages();
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  // Render the image table
  if (loading) {
    return (
      <div className="flex justify-center items-center p-32">
        <div className="w-12 h-12 border-t-4 border-orange-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mt-3">
      <h2 className="text-2xl font-bold mb-4">Image Table</h2>

      {images.length === 0 ? (
        <div className="flex items-center justify-center space-x-2 p-32 ">
          <span className="text-4xl text-red-500">!</span>
          <span className="text-lg text-gray-600">No data available</span>
        </div>
      ) : (
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-orange-500 text-white">
              <th className="border border-gray-300 px-4 py-2">Image Title</th>
              <th className="border border-gray-300 px-4 py-2">Description</th>
              <th className="border border-gray-300 px-4 py-2">Image</th>
              <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {images.map((image) => (
              <tr key={image._id} className="text-center">
                <td className="border border-gray-300 px-4 py-2">
                  {image.title}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {image.description}
                </td>
                <td className="border border-gray-300">
                  {image.image && (
                    <>
                      {console.log("After Photo Base64:", image.image)}
                      <img
                        src={image.image}
                        alt={image.title}
                        className="h-16 w-16 object-cover"
                        onError={(e) => {
                          console.error("Error loading image", e);
                          console.log("Image Base64:", image.image);
                        }}
                      />
                    </>
                  )}
                </td>
                <td className="border border-gray-300 px-4 py-2 space-x-2">
                  <button
                    type="button" // Explicitly set type to prevent form submission behavior
                    onClick={() => onEdit(image)}
                    className="bg-blue-500 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    type="button" // Explicitly set type
                    onClick={() => handleDelete(image._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ImageTable;
