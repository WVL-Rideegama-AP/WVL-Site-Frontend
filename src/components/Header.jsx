import React from "react";
import { Link } from "react-router-dom"; // Import Link component from react-router-dom for navigation
import Button from "@mui/material/Button"; // Import Material UI Button component for styled button

const Header = () => {
  return (
    <div className="ml-3 mr-3 text-black josefin-sans-700 flex justify-between items-center pt-2 pb-2">
      {/* Logo section */}
      <Link to="/">
        {" "}
        {/* Link back to home page */}
        <h1 className="cursor-pointer">
          L<span className="text-orange-500">O</span>G
          <span className="text-orange-500">O</span>{" "}
          {/* Logo text with styling */}
        </h1>
      </Link>

      {/* Navigation menu */}
      <ul className="flex gap-12 items-center">
        {/* Home link */}
        <li className="cursor-pointer hover:text-[#ff9100]">
          {" "}
          {/* Style change on hover */}
          <Link to="/home">HOME</Link> {/* Link to the home page */}
        </li>

        {/* Contact link with styled button */}
        <li className="cursor-pointer hover:text-[#ff9100]">
          <Link to="/contact">
            {" "}
            {/* Link to the contact page */}
            <Button
              variant="outlined" // Outlined Material-UI button variant
              sx={{
                color: "#ff9100", // Text color
                borderColor: "#ff9100", // Button border color
                borderWidth: "2px", // Button border width
                fontWeight: "700", // Font weight
                borderRadius: "0px", // No border radius (square edges)
                fontFamily: "Josefin Sans", // Custom font
                lineHeight: "normal", // Standard line height
                padding: "8px 16px", // Button padding
                "&:hover": {
                  backgroundColor: "#ff9100", // Background color on hover
                  color: "#fff", // Text color on hover
                },
              }}
            >
              CONTACT
            </Button>
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Header;
