import React from "react";

const ServicesFilter = ({ handleChange }) => {
  return (
    <div>
      <label className="block text-gray-700 font-medium mb-2">Services</label>
      <div className="space-y-2">
        <div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="has_water_supply"
              onChange={handleChange}
              className="form-checkbox text-blue-600"
            />
            <span className="ml-2">24-hour Water Supply</span>
          </label>
        </div>
        <div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="has_electricity"
              onChange={handleChange}
              className="form-checkbox text-blue-600"
            />
            <span className="ml-2">24-hour Electricity</span>
          </label>
        </div>
        <div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="has_parking"
              onChange={handleChange}
              className="form-checkbox text-blue-600"
            />
            <span className="ml-2">Parking Available</span>
          </label>
        </div>
        <div>
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              name="has_wifi"
              onChange={handleChange}
              className="form-checkbox text-blue-600"
            />
            <span className="ml-2">Internet/Wi-Fi</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ServicesFilter;
