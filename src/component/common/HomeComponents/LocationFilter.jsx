import React from "react";
import { LocationName } from "../../locations/LocationsName";

const LocationFilter = ({ handleChange }) => {
  return (
    <div>
      <label htmlFor="location" className="block text-gray-700 font-medium mb-2">
        Location
      </label>
      <select
        id="location"
        name="address"  // Use "address" as the name to map to the backend API
        onChange={handleChange}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
      >
        <option value="">Select a location</option>
        {LocationName.map((loc) => (
          <option key={loc.value} value={loc.value}>
            {loc.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default LocationFilter;
