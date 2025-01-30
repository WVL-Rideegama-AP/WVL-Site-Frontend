import React, { useEffect, useState, useCallback } from "react"; // Import necessary hooks from React

const DataTable = ({ tab, onEdit, refreshTable }) => {
  // State for holding fetched data
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  const fetchData = useCallback(async () => {
    setLoading(true); // Set loading to true when fetching starts
    try {
      const response = await fetch(`http://localhost:5000/api/${tab}`);
      if (!response.ok) throw new Error("Failed to fetch data");
      const jsonData = await response.json();
      console.log("Fetched Data:", jsonData); // Log the fetched data
      setData(jsonData); // Update state with fetched data
    } catch (error) {
      console.error("Error fetching data:", error); // Log errors
    } finally {
      setLoading(false); // Set loading to false after fetching completes
    }
  }, [tab]);

  // Fetch data initially and when `tab` or `refreshTable` changes
  useEffect(() => {
    fetchData(); // Call fetchData to get data
  }, [fetchData, refreshTable]); // Dependencies on fetchData and refreshTable

  // Delete item from API
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return; // Confirmation prompt
    try {
      const response = await fetch(`http://localhost:5000/api/${tab}/${id}`, {
        method: "DELETE", // Set method to DELETE
      });
      if (!response.ok) throw new Error("Failed to delete item"); // Error handling
      alert("Item deleted successfully!"); // Success message
      fetchData(); // Refresh data after delete
    } catch (error) {
      console.error("Error deleting item:", error); // Log errors
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center p-32">
        <div className="w-12 h-12 border-t-4 border-orange-500 border-solid rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mt-3">
      <h2 className="text-2xl font-bold mb-4">{tab.toUpperCase()} Data</h2>

      {data.length === 0 ? (
        <div className="flex items-center justify-center space-x-2 p-32 ">
          <span className="text-4xl text-red-500">!</span>
          <span className="text-lg text-gray-600">No data available</span>
        </div>
      ) : (
        <table className="min-w-full border border-gray-300">
          <thead>
            <tr className="bg-orange-500 text-white">
              {/* Table header */}
              <th className="border border-gray-300">National ID</th>
              <th className="border border-gray-300">Name</th>
              <th className="border border-gray-300">Project</th>
              <th className="border border-gray-300">GS Division</th>
              <th className="border border-gray-300">Address</th>
              <th className="border border-gray-300">Description</th>
              <th className="border border-gray-300">Latitude</th>
              <th className="border border-gray-300">Longitude</th>
              <th className="border border-gray-300">Before Image</th>
              <th className="border border-gray-300">After Image</th>
              <th className="border border-gray-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                {/* Table data rows */}
                <td className="border border-gray-300">{item.nationalId}</td>
                <td className="border border-gray-300">{item.name}</td>
                <td className="border border-gray-300">{item.project}</td>
                <td className="border border-gray-300">{item.gsDivision}</td>
                <td className="border border-gray-300">{item.address}</td>
                <td className="border border-gray-300">{item.description}</td>
                <td className="border border-gray-300">{item.lat}</td>
                <td className="border border-gray-300">{item.lng}</td>
                <td className="border border-gray-300">
                  {item.beforePhoto && (
                    <>
                      {console.log("Before Photo Base64:", item.beforePhoto)}
                      <img
                        src={item.beforePhoto}
                        alt="Before"
                        className="h-16 w-16 object-cover"
                        onError={(e) => {
                          console.error("Error loading before photo", e);
                          console.log("Before Photo Base64:", item.beforePhoto);
                        }}
                      />
                    </>
                  )}
                </td>
                <td className="border border-gray-300">
                  {item.afterPhoto && (
                    <>
                      {console.log("After Photo Base64:", item.afterPhoto)}
                      <img
                        src={item.afterPhoto}
                        alt="After"
                        className="h-16 w-16 object-cover"
                        onError={(e) => {
                          console.error("Error loading after photo", e);
                          console.log("After Photo Base64:", item.afterPhoto);
                        }}
                      />
                    </>
                  )}
                </td>

                <td className="border border-gray-300 flex space-x-2 justify-center">
                  {/* Action buttons */}
                  <button
                    onClick={() => onEdit(item)} // Call onEdit with the current item
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)} // Call handleDelete with item ID
                    className="bg-red-500 text-white px-2 py-1 rounded"
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

export default DataTable; // Export DataTable component
