import React, { useEffect, useState, useCallback } from "react";

const DataTable = ({ tab, onEdit, refreshTable }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const apiUrl = process.env.REACT_APP_API_BASE_URL;
      if (!apiUrl) throw new Error("API URL is missing!");

      const response = await fetch(`${apiUrl}/api/${tab}`);
      if (!response.ok) throw new Error("Failed to fetch data");

      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }, [tab]);

  useEffect(() => {
    fetchData();
  }, [fetchData, refreshTable]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      const apiUrl = process.env.REACT_APP_API_BASE_URL;
      if (!apiUrl) throw new Error("API URL is missing!");

      const response = await fetch(`${apiUrl}/api/${tab}/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete item");

      alert("Item deleted successfully!");
      fetchData();
    } catch (error) {
      console.error("Error deleting item:", error);
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
        <div className="flex items-center justify-center space-x-2 p-32">
          <span className="text-4xl text-red-500">!</span>
          <span className="text-lg text-gray-600">No data available</span>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-orange-500 text-white">
                <th className="border border-gray-300 px-2 py-2">
                  National ID
                </th>
                <th className="border border-gray-300 px-2 py-2">Name</th>
                <th className="border border-gray-300 px-2 py-2">Project</th>
                <th className="border border-gray-300 px-2 py-2">
                  GS Division
                </th>
                <th className="border border-gray-300 px-2 py-2">Address</th>
                <th className="border border-gray-300 px-2 py-2">
                  Description
                </th>
                <th className="border border-gray-300 px-2 py-2">Latitude</th>
                <th className="border border-gray-300 px-2 py-2">Longitude</th>
                <th className="border border-gray-300 px-2 py-2">
                  Before Image
                </th>
                <th className="border border-gray-300 px-2 py-2">
                  After Image
                </th>
                <th className="border border-gray-300 px-2 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item._id} className="text-center">
                  <td className="border border-gray-300 px-2 py-2">
                    {item.nationalId}
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    {item.name}
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    {item.project}
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    {item.gsDivision}
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    {item.address}
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    {item.description}
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    {item.lat}
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    {item.lng}
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    {item.beforePhoto && (
                      <img
                        src={item.beforePhoto}
                        alt="Before"
                        className="h-12 w-12 object-cover rounded"
                      />
                    )}
                  </td>
                  <td className="border border-gray-300 px-2 py-2">
                    {item.afterPhoto && (
                      <img
                        src={item.afterPhoto}
                        alt="After"
                        className="h-12 w-12 object-cover rounded"
                      />
                    )}
                  </td>
                  <td className="border border-gray-300 px-2 py-2 flex flex-wrap justify-center gap-2">
                    <button
                      onClick={() => onEdit(item)}
                      className="bg-blue-500 text-white px-2 py-1 rounded text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DataTable;
