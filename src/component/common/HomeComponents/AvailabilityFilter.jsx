// AvailabilityFilter.js
import React from 'react';

const AvailabilityFilter = () => {
  return (
    <div>
      <label htmlFor="availability" className="block text-gray-700 font-medium mb-2">Availability</label>
      <select
        id="availability"
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
      >
        <option value="">All</option>
        <option value="available">Available</option>
        <option value="unavailable">Unavailable</option>
      </select>
    </div>
  );
};

export default AvailabilityFilter;
