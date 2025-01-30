import React, { useState } from "react";
import DataTable from "./Upload/DataTable";
import UploadData from "./Upload/UploadData";
import ImageUpload from "./Upload/ImageUpload";
import ImageTable from "./Upload/ImageTable";

const MainPage = () => {
  const [selectedTab, setSelectedTab] = useState("cesp");
  const [selectedData, setSelectedData] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [refreshTable, setRefreshTable] = useState(false);
  const [uploadMode, setUploadMode] = useState("data"); // 'data' or 'image'
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const handleTabChange = (e) => {
    setSelectedTab(e.target.value);
    setSelectedData(null); // Reset selected data when switching tabs
    setRefreshTable(!refreshTable); // Trigger refresh
  };

  const handleEdit = (item) => setSelectedData(item);

  const resetSelection = () => {
    setSelectedData(null);
    setRefreshTable(!refreshTable); // Trigger refresh after reset
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading
    setError("");

    // Simulate a login process (replace this with real authentication logic)
    setTimeout(() => {
      if (username === "admin" && password === "password") {
        setIsAuthenticated(true);
      } else {
        setError("Invalid username or password.");
      }
      setIsLoading(false); // End loading
    }, 2000); // Simulate a 2-second delay for login
  };

  const toggleUploadMode = (mode) => {
    setUploadMode(mode);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96">
          <h1 className="text-3xl font-bold text-center text-orange-600 mb-6">
            Admin Login
          </h1>

          {/* Error message */}
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
                required
              />
            </div>
            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-200"
                required
              />
            </div>

            <div>
              <button
                type="submit"
                className={`w-full py-3 rounded-md text-white bg-orange-600 font-semibold focus:outline-none focus:ring-2 focus:ring-orange-500 transition duration-300 ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="flex justify-center items-center space-x-2">
                    <div className="w-6 h-6 border-t-4 border-white border-700 border-solid rounded-full animate-spin"></div>
                    <span>Logging in...</span>
                  </div>
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-200 min-h-screen">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-4xl font-bold text-orange-600">Admin Panel</h1>
      </div>

      {/* Tab-style switch for Upload Mode */}
      <div className="mb-6 flex justify-start space-x-4 border-b-2">
        <button
          onClick={() => toggleUploadMode("data")}
          className={`py-2 px-4 text-lg font-semibold transition-all duration-300 ${
            uploadMode === "data"
              ? "border-b-4 border-orange-600 text-orange-600"
              : "text-gray-600"
          }`}
        >
          Data Upload
        </button>
        <button
          onClick={() => toggleUploadMode("image")}
          className={`py-2 px-4 text-lg font-semibold transition-all duration-300 ${
            uploadMode === "image"
              ? "border-b-4 border-orange-600 text-orange-600"
              : "text-gray-600"
          }`}
        >
          Image Upload
        </button>
      </div>

      {/* Conditional rendering based on upload mode */}
      {uploadMode === "image" ? (
        <>
          <ImageUpload
            selectedData={selectedData}
            resetSelection={resetSelection}
            onSubmit={resetSelection}
          />
          <ImageTable onEdit={handleEdit} refreshTable={refreshTable} />
        </>
      ) : (
        <>
          <h2 className="text-2xl font-semibold mb-4">Select a Tab</h2>
          <select
            onChange={handleTabChange}
            value={selectedTab}
            className="border rounded p-2 mb-4 w-full sm:w-80"
          >
            <option value="cesp">CESP</option>
            <option value="cp">CP</option>
            <option value="led">LED</option>
            <option value="in">IN</option>
          </select>
          <UploadData
            tab={selectedTab}
            selectedData={selectedData}
            resetSelection={resetSelection}
            onSubmit={resetSelection}
          />
          <DataTable
            tab={selectedTab}
            onEdit={handleEdit}
            refreshTable={refreshTable}
          />
        </>
      )}
    </div>
  );
};

export default MainPage;
