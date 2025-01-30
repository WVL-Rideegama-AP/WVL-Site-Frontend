import React, { useState, useEffect, useRef } from "react";

const UploadData = ({ tab, selectedData, resetSelection, onSubmit }) => {
  const [formData, setFormData] = useState({
    nationalId: "",
    name: "",
    project: "",
    gsDivision: "",
    address: "",
    description: "",
    lat: "",
    lng: "",
    beforePhoto: null,
    afterPhoto: null,
  });
  const [isUploading, setIsUploading] = useState(false); // Track the upload state

  // Use refs for the file input elements
  const beforePhotoRef = useRef(null);
  const afterPhotoRef = useRef(null);

  useEffect(() => {
    if (selectedData) {
      setFormData({
        nationalId: selectedData.nationalId || "",
        name: selectedData.name || "",
        project: selectedData.project || "",
        gsDivision: selectedData.gsDivision || "",
        address: selectedData.address || "",
        description: selectedData.description || "",
        lat: selectedData.lat || "",
        lng: selectedData.lng || "",
        beforePhoto: selectedData.beforePhoto || null, // Use existing image URL or null
        afterPhoto: selectedData.afterPhoto || null, // Use existing image URL or null
      });
    } else {
      resetForm();
    }
  }, [selectedData]);

  const resetForm = () => {
    setFormData({
      nationalId: "",
      name: "",
      project: "",
      gsDivision: "",
      address: "",
      description: "",
      lat: "",
      lng: "",
      beforePhoto: null,
      afterPhoto: null,
    });

    // Reset file input fields
    if (beforePhotoRef.current) beforePhotoRef.current.value = "";
    if (afterPhotoRef.current) afterPhotoRef.current.value = "";

    // Reset image previews
    setFormData((prevData) => ({
      ...prevData,
      beforePhoto: null,
      afterPhoto: null,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData((prev) => ({ ...prev, [name]: files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiUrl = process.env.REACT_APP_API_BASE_URL;
    if (!apiUrl) {
      alert("API URL is missing! Check your .env file.");
      return;
    }

    const url = selectedData
      ? `${apiUrl}/api/${tab}/${selectedData._id}`
      : `${apiUrl}/api/${tab}`;
    const payload = new FormData();

    for (let key in formData) {
      if (key === "beforePhoto" || key === "afterPhoto") {
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
          ? "Data updated successfully!"
          : "Data uploaded successfully!"
      );
      resetForm();
      onSubmit();
    } catch (error) {
      console.error("Error saving data:", error);
      alert("Error saving data. Please try again.");
    } finally {
      setIsUploading(false); // End uploading
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">
        {selectedData
          ? `Edit Data for ${tab.toUpperCase()}`
          : `Upload Data for ${tab.toUpperCase()}`}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="nationalId"
            placeholder="ID"
            value={formData.nationalId}
            onChange={handleChange}
            className="border rounded p-3 w-full"
            required
          />
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="border rounded p-3 w-full"
            required
          />
          <input
            type="text"
            name="project"
            placeholder="Project"
            value={formData.project}
            onChange={handleChange}
            className="border rounded p-3 w-full"
            required
          />
          <input
            type="text"
            name="gsDivision"
            placeholder="GS Division"
            value={formData.gsDivision}
            onChange={handleChange}
            className="border rounded p-3 w-full"
            required
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="border rounded p-3 w-full"
            required
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="border rounded p-3 w-full"
            required
          />
          <input
            type="text"
            name="lat"
            placeholder="Latitude"
            value={formData.lat}
            onChange={handleChange}
            className="border rounded p-3 w-full"
            required
          />
          <input
            type="text"
            name="lng"
            placeholder="Longitude"
            value={formData.lng}
            onChange={handleChange}
            className="border rounded p-3 w-full"
            required
          />
          <div>
            <label className="block mb-2">Before Photo:</label>
            {formData.beforePhoto &&
              !(formData.beforePhoto instanceof File) && (
                <img
                  src={formData.beforePhoto} // Preview the existing image URL
                  alt="Before"
                  className="h-16 w-16 object-cover mb-2"
                />
              )}
            <input
              type="file"
              name="beforePhoto"
              onChange={handleFileChange}
              className="border rounded p-3 w-full file:border-none file:bg-orange-500 file:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              accept="image/*"
              ref={beforePhotoRef}
            />
          </div>
          <div>
            <label className="block mb-2">After Photo:</label>
            {formData.afterPhoto && !(formData.afterPhoto instanceof File) && (
              <img
                src={formData.afterPhoto} // Preview the existing image URL
                alt="After"
                className="h-16 w-16 object-cover mb-2"
              />
            )}
            <input
              type="file"
              name="afterPhoto"
              onChange={handleFileChange}
              className="border rounded p-3 w-full file:border-none file:bg-orange-500 file:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              accept="image/*"
              ref={afterPhotoRef}
            />
          </div>
        </div>
        <div className="flex space-x-4">
          <button
            type="submit"
            className={`${
              isUploading
                ? "bg-gray-400 text-gray-700 cursor-not-allowed"
                : "bg-orange-500 text-white"
            } px-4 py-2 rounded flex items-center justify-center w-full transition duration-300`}
            disabled={isUploading}
          >
            {isUploading ? (
              <div className="w-6 h-6 border-t-4 border-orange-500 border-solid rounded-full animate-spin mr-4 "></div>
            ) : null}
            {isUploading
              ? "Uploading..."
              : selectedData
              ? "Submit"
              : "Upload Data"}
          </button>
          {selectedData && (
            <button
              type="button"
              onClick={resetSelection}
              className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default UploadData;
