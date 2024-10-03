import React, { useState } from "react";
import AvailabilityFilter from "./AvailabilityFilter";
import LocationFilter from "./LocationFilter";
import PriceFilter from "./PriceFilter";
import ServicesFilter from "./ServicesFilter";

const SearchBar = ({ onSearch }) => {
  const [filters, setFilters] = useState({
    is_available: '',
    address: '',
    min_price: '',
    max_price: '',
    has_wifi: false,
    has_water_supply: false,
    has_electricity: false,
    has_parking: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Remove empty values from the filter object before passing it
    const cleanFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, v]) => v !== '' && v !== false)
    );
    onSearch(cleanFilters);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="flex space-x-4">
          <AvailabilityFilter handleChange={handleChange} />
          <LocationFilter handleChange={handleChange} />
          <PriceFilter handleChange={handleChange} />
          <ServicesFilter handleChange={handleChange} />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
