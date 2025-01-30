import React, { useRef, useState, useEffect } from "react";
import Card from "../Card"; // Importing Card component to display project cards
import Map from "../Map"; // Importing Map component to display the map

const IN = () => {
  const [expandedCardId, setExpandedCardId] = useState(null); // Track which card is expanded
  const [searchQuery, setSearchQuery] = useState(""); // State for search input
  const [selectedProjectType, setSelectedProjectType] = useState(""); // State for selected project type
  const [selectedGsDivision, setSelectedGsDivision] = useState(""); // State for selected GS division
  const [filteredCards, setFilteredCards] = useState([]); // State for cards after filtering
  const [cardsData, setCardsData] = useState([]); // State to store fetched cards from MongoDB
  const [isLoading, setIsLoading] = useState(true); // State to track loading status
  const mapRef = useRef(null); // Reference for the Map component

  // Fetch card data from the backend API on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/in"); // Adjust the URL based on your backend
        const data = await response.json(); // Convert response to JSON
        setCardsData(data); // Set fetched data to cardsData
        setFilteredCards(data); // Initialize filteredCards with all fetched data
        setIsLoading(false); // Set loading to false after data is fetched
      } catch (error) {
        console.error("Error fetching data:", error); // Log error if fetching fails
        setIsLoading(false); // Set loading to false even if there's an error
      }
    };
    fetchData(); // Call the fetch function
  }, []); // Empty dependency array to run only once when the component mounts

  // Update filteredCards based on search and filter criteria
  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase(); // Normalize search query to lowercase
    const filtered = cardsData.filter((card) => {
      const matchesSearch =
        card.name.toLowerCase().includes(lowercasedQuery) || // Check if name matches the search query
        card.project.toLowerCase().includes(lowercasedQuery); // Check if project matches the search query
      const matchesProjectType = selectedProjectType
        ? card.project === selectedProjectType // Filter by project type if selected
        : true; // Include all if no project type is selected
      const matchesGsDivision = selectedGsDivision
        ? card.gsDivision === selectedGsDivision // Filter by GS division if selected
        : true; // Include all if no GS division is selected
      return matchesSearch && matchesProjectType && matchesGsDivision; // Return true if all conditions match
    });
    setFilteredCards(filtered); // Update state with filtered cards
  }, [searchQuery, selectedProjectType, selectedGsDivision, cardsData]); // Re-run when dependencies change

  // Handle card click to zoom into the map
  const handleCardClick = (_id) => {
    setExpandedCardId(_id); // Set the clicked card as expanded
    const card = cardsData.find((card) => card._id === _id); // Find the corresponding card data
    if (card && mapRef.current) {
      mapRef.current.zoomToLocation(card.lat, card.lng); // Zoom into the card's location on the map
    }
  };

  const handleMarkerClick = (_id) => {
    setExpandedCardId(_id); // Expand the card corresponding to the clicked marker
  };

  return (
    <div className="mr-5 ml-5 flex flex-col items-center font-sans">
      {/* Heading */}
      <h1 className="text-4xl font-bold mb-5 mt-5">
        Integrated Nutrition Project
      </h1>
      <p className="mb-6">Short description here</p>

      {/* Responsive Container for the layout */}
      <div className="flex flex-col lg:flex-row w-full">
        {/* Left Column for the list of projects */}
        <div className="lg:w-2/5  bg-gray-100 p-6 m-3 rounded-xl">
          <h2 className="text-xl font-bold mb-4">List of IN Projects</h2>

          {/* Search Bar with Icon */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-full p-2 pl-10 border border-gray-300 rounded-full"
              value={searchQuery} // Bind input value to searchQuery state
              onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery on input change
            />
            <button className="absolute right-4 top-1/2 transform -translate-y-1/2">
              <img
                src={require("../../assets/search.png")} // Assuming the search icon is in the assets folder
                alt="Search" // Alt text for accessibility
                className="w-5 h-5"
              />
            </button>
          </div>

          {/* Filters Row for project type and GS division */}
          <div className="flex space-x-4 mb-4">
            <select
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={selectedProjectType} // Bind select value to selectedProjectType state
              onChange={(e) => setSelectedProjectType(e.target.value)} // Update project type on selection change
            >
              <option value="">All Project Types</option>
              <option value="Project 1">Project 1</option>
              <option value="Project 2">Project 2</option>
              <option value="Project 3">Project 3</option>
            </select>

            <select
              className="w-full p-2 border border-gray-300 rounded-lg"
              value={selectedGsDivision} // Bind select value to selectedGsDivision state
              onChange={(e) => setSelectedGsDivision(e.target.value)} // Update GS division on selection change
            >
              <option value="">All GS Divisions</option>
              {/* List of GS Divisions */}
              <option value="Delvita">Delvita</option>
              <option value="Egodamulla">Egodamulla</option>
              <option value="Gallawa">Gallawa</option>
              <option value="Iriyagolla">Iriyagolla</option>
              <option value="Kalugahathanna">Kalugahathanna</option>
              <option value="Katiyawa">Katiyawa</option>
              <option value="Kithulgolla">Kithulgolla</option>
              <option value="Korossa">Korossa</option>
              <option value="Kotuhena">Kotuhena</option>
              <option value="Nahalla">Nahalla</option>
              <option value="Nalaulla">Nalaulla</option>
              <option value="Nithulpitiya">Nithulpitiya</option>
              <option value="Pallekanda">Pallekanda</option>
              <option value="Udahena">Udahena</option>
              <option value="Wadurassa">Wadurassa</option>
            </select>

            {/* Reset Filters Button */}
            <button
              className="w-full bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600"
              onClick={() => setFilteredCards(cardsData)} // Reset filters to show all cards
            >
              Reset Filters
            </button>
          </div>

          {/* List of Cards with Scroll */}
          <div className="mt-4 h-[calc(80vh-200px)] overflow-y-auto">
            {isLoading ? (
              <div className="flex justify-center items-center p-32">
                <div className="w-12 h-12 border-t-4 border-orange-500 border-solid rounded-full animate-spin"></div>
              </div>
            ) : filteredCards.length === 0 ? (
              <div className="flex items-center justify-center space-x-2 p-32 ">
                <span className="text-4xl text-red-500">!</span>
                <span className="text-lg text-gray-600">No data available</span>
              </div>
            ) : (
              filteredCards.map((card) => (
                <Card
                  key={card._id} // Unique key for each card
                  cardData={card} // Pass card data to Card component
                  isExpanded={card._id === expandedCardId} // Determine if the card is expanded
                  onClick={() => handleCardClick(card._id)} // Handle click to expand card and zoom map
                />
              ))
            )}
          </div>
        </div>

        {/* Right Column for the map */}
        <div className="lg:w-3/5 p-4 ">
          <Map
            ref={mapRef} // Pass the ref to the Map component
            cardsData={cardsData} // Pass all card data to the Map component
            onMarkerClick={handleMarkerClick} // Handle marker clicks
            className="h-64 lg:h-auto" // Set height for smaller screens
          />
        </div>
      </div>
    </div>
  );
};

export default IN; // Export the component for use in other parts of the application
