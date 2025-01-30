// src/components/Tabs.jsx
import React, { useState } from "react";
import { Tabs as MuiTabs, Tab, Box } from "@mui/material";
import CESP from "./tabs/CESP";
import CP from "./tabs/CP";
import IN from "./tabs/IN";
import LED from "./tabs/LED";

// Function to render content based on the selected tab
const renderContent = (activeTab) => {
  switch (activeTab) {
    case "CESP":
      return <CESP />;
    case "CP":
      return <CP />;
    case "IN":
      return <IN />;
    case "LED":
      return <LED />;
    default:
      return null;
  }
};

const Tabs = () => {
  const [activeTab, setActiveTab] = useState(null); // Set initial state to null

  // Handle tab change
  const handleChange = (event, newValue) => {
    setActiveTab(newValue); // Update activeTab state with the selected tab
  };

  return (
    <Box sx={{ width: "100%", marginBottom: "20px" }}>
      {/* MUI Tabs with custom styling */}
      <MuiTabs
        value={activeTab}
        onChange={(event, newValue) => handleChange(event, newValue)}
        centered
        sx={{
          "& .MuiTabs-indicator": {
            backgroundColor: "#FF9800", // Orange indicator
          },
          "& .MuiTab-root": {
            color: "#333", // Default text color
            fontWeight: "bold", // Bold font for tabs
            fontSize: "16px", // Font size for tabs
            fontFamily: "Roboto, sans-serif", // Font family for tabs
            ":hover": {
              color: "#FF9800", // Hovered tab text color
            },
            "&.Mui-selected": {
              color: "#FF9800", // Selected tab text color
            },
          },
        }}
      >
        {/* Setting the tab labels, but only change the value when clicked */}
        <Tab label="CESP" value={0} />
        <Tab label="CP" value={1} />
        <Tab label="IN" value={2} />
        <Tab label="LED" value={3} />
      </MuiTabs>

      {/* Render the selected tab's content, or show the default grid layout if no tab is selected */}
      {activeTab !== null ? (
        <Box sx={{ p: 3 }}>
          {renderContent(["CESP", "CP", "IN", "LED"][activeTab])}
        </Box>
      ) : (
        <div className="container mx-auto py-8">
          {/* Default grid layout when no tab is selected */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex flex-col  p-4 border-r border-gray-300 last:border-r-0">
              <h2 className="text-lg font-bold">
                CESP - Community Engagement in Sponsorship Plan
              </h2>
              <p>Short description about the CESP project.</p>
            </div>
            <div className="flex flex-col  p-4 border-r border-gray-300 last:border-r-0">
              <h2 className="text-lg font-bold">
                CP - Child Protection and Participation
              </h2>
              <p>Short description about the CP project.</p>
            </div>
            <div className="flex flex-col  p-4 border-r border-gray-300 last:border-r-0">
              <h2 className="text-lg font-bold">IN - Integrated Nutrition</h2>
              <p>Short description about the IN project.</p>
            </div>
            <div className="flex flex-col  p-4 border-r border-gray-300 last:border-r-0">
              <h2 className="text-lg font-bold">
                LED - Livelihood and Economic Development
              </h2>
              <p>Short description about the CESP project.</p>
            </div>
          </div>
        </div>
      )}
    </Box>
  );
};

export default Tabs;
