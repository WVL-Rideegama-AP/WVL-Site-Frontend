import React, { useState, useEffect, useRef } from "react";

const ImageUpload = ({ selectedData, resetSelection, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
  });
  const [isUploading, setIsUploading] = useState(false); // State to track upload status

  // Use ref for the file input element
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (selectedData) {
      setFormData({
        title: selectedData.title || "",
        description: selectedData.description || "",
        image: selectedData.image || null, // Use existing image URL or null
      });
    } else {
      resetForm();
    }
  }, [selectedData]);

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      image: null,
    });
    if (fileInputRef.current) fileInputRef.current.value = "";

    // Reset image previews
    setFormData((prevData) => ({
      ...prevData,
      image: null,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { files } = e.target;
    setFormData((prev) => ({ ...prev, image: files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = selectedData
      ? `http://localhost:5000/gallery/${selectedData._id}`
      : `http://localhost:5000/gallery`;
    const payload = new FormData();

    for (let key in formData) {
      if (key === "image") {
        if (formData[key] instanceof File) {
          // Only append files, not URLs
          payload.append(key, formData[key]);
        }
      } else {
        payload.append(key, formData[key]);
      }
    }
    setIsUploading(true); // Start uploading

    try {
      const response = await fetch(url, {
        method: selectedData ? "PUT" : "POST",
        body: payload,
      });
      if (!response.ok) throw new Error("Failed to save data");

      alert(
        selectedData
          ? "Image updated successfully!"
          : "Image uploaded successfully!"
      );
      resetForm();
      onSubmit();
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image. Please try again.");
    } finally {
      setIsUploading(false); // End uploading
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-orange-600 mb-4">Upload Image</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            className="border rounded p-3 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          />
        </div>
        <div>
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="border rounded p-3 w-full focus:outline-none focus:ring-2 focus:ring-orange-500"
            required
          ></textarea>
        </div>
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-700">
            Select Image:
          </label>
          {formData.image && !(formData.image instanceof File) && (
            <img
              src={formData.image} // Preview the existing image URL
              alt="Preview"
              className="h-16 w-16 object-cover mb-2"
            />
          )}
          <input
            type="file"
            name="image"
            onChange={handleFileChange}
            className="border rounded p-3 w-full file:border-none file:bg-orange-500 file:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            accept="image/*"
            ref={fileInputRef}
          />
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className={`${
              isUploading
                ? "bg-orange-300 text-white cursor-not-allowed"
                : "bg-orange-500 text-white hover:bg-orange-600"
            } px-4 py-2 rounded flex items-center justify-center w-full transition duration-300`}
            disabled={isUploading}
          >
            {isUploading ? (
              <div className="w-6 h-6 border-t-4 border-white border-700 border-solid rounded-full animate-spin mr-4"></div>
            ) : null}
            {isUploading
              ? "Uploading..."
              : selectedData
              ? "Submit"
              : "Upload Image"}
          </button>
          {selectedData && (
            <button
              type="button"
              onClick={resetSelection}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 transition duration-200"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ImageUpload;
