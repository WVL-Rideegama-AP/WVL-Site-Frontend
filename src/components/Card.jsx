import React from "react";

const Card = ({ cardData, isExpanded, onClick }) => {
  return (
    <div
      className={`p-4 mb-4 border border-gray-300 rounded-lg cursor-pointer transition-transform duration-300 ease-in-out transform ${
        isExpanded ? "bg-gray-200 scale-100" : "bg-white hover:scale-102"
      }`}
      onClick={onClick} // Trigger the onClick function passed as a prop when the card is clicked
    >
      {/* Card header displaying name and project information */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <h3 className="text-lg font-semibold">{cardData.name}</h3>{" "}
          {/* Card name */}
          <p className="text-gray-600">{cardData.project}</p>{" "}
          {/* Associated project */}
        </div>
        <div className="text-right">
          <p className="font-semibold text-gray-500">{cardData.gsDivision}</p>{" "}
          {/* GS division information */}
        </div>
      </div>

      {/* Conditionally render additional details if the card is expanded */}
      {isExpanded && (
        <div className="mt-4">
          <p>
            <strong>ID:</strong> {cardData.nationalId} {/* Display card ID */}
          </p>
          <p>
            <strong>Address:</strong> {cardData.address} {/* Display address */}
          </p>
          <p>
            <strong>Description:</strong> {cardData.description}{" "}
            {/* Display description */}
          </p>
          <p>
            <strong>Before:</strong>
            {cardData.beforePhoto && (
              <img
                src={cardData.beforePhoto}
                alt="Before"
                className="h-1/6 w-auto object-cover"
              />
            )}
          </p>
          <p>
            <strong>After:</strong>
            {cardData.afterPhoto && (
              <img
                src={cardData.afterPhoto}
                alt="After"
                className="h-1/6 w-auto object-cover"
              />
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default Card;
