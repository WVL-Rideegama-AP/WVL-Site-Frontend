import React, { useCallback, useImperativeHandle, useState } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

// Styles for the Google Map container
const mapContainerStyle = {
  width: "100%",
  height: "80vh",
  borderRadius: "10px", // Rounded corners for the map container
  overflow: "hidden", // Prevent content overflow
  boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)", // Soft shadow effect
};

// Default center coordinates for the map (Colombo, Sri Lanka)
const defaultCenter = {
  lat: 7.54542,
  lng: 80.489297,
};

const Map = React.forwardRef(({ cardsData, onMarkerClick }, ref) => {
  // Load the Google Maps script using an API key
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  });

  const [map, setMap] = useState(null); // State to store the map instance

  // Callback function to initialize the map and store the instance
  const onMapLoad = useCallback((mapInstance) => {
    setMap(mapInstance);
  }, []);

  // Expose the zoomToLocation method to parent components using refs
  useImperativeHandle(ref, () => ({
    zoomToLocation: (lat, lng) => {
      if (map) {
        map.panTo({ lat, lng }); // Move the map to the specified lat/lng
        map.setZoom(18); // Zoom in to a specified level (adjust as needed)
      }
    },
  }));

  // Display an error message if there's an issue loading the map
  if (loadError) return <div>Error loading map</div>;

  // Display a loading message while the map is being initialized
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle} // Apply the container styles to the map
      zoom={10} // Default zoom level
      center={defaultCenter} // Initial center of the map
      onLoad={onMapLoad} // Handle map load event
    >
      {/* Render markers based on the passed cardsData */}
      {cardsData.map((card) => (
        <Marker
          key={card._id} // Unique key for each marker
          position={{ lat: card.lat, lng: card.lng }} // Position marker at specific lat/lng
          title={card.name} // Marker title displayed on hover
          onClick={() => onMarkerClick(card._id)} // Trigger click event to notify parent
        />
      ))}
    </GoogleMap>
  );
});

export default Map;
