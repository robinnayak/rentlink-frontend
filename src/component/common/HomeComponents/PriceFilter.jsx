import React from "react";

const PriceFilter = ({ handleChange }) => {
  return (
    <div>
      <label className="block text-gray-700 font-medium mb-2">Price Range</label>
      <div className="flex space-x-4">
        <input
          type="number"
          name="min_price"
          placeholder="Min"
          onChange={handleChange}
          className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <input
          type="number"
          name="max_price"
          placeholder="Max"
          onChange={handleChange}
          className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>
    </div>
  );
};

export default PriceFilter;
