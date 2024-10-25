import React, { useState } from "react";
import { LocationName } from "../../locations/LocationsName";

const LocationFilter = ({ handleChange }) => {
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  
  const handleProvinceChange = (e) => {
    const province = e.target.value;
    setSelectedProvince(province);
    setSelectedDistrict("");
    handleChange({ target: { name: "province", value: province } });
    handleChange({ target: { name: "district", value: "" } });
    handleChange({ target: { name: "address", value: "" } });
  };

  const handleDistrictChange = (e) => {
    const district = e.target.value;
    setSelectedDistrict(district);
    handleChange({ target: { name: "district", value: district } });
    handleChange({ target: { name: "address", value: "" } });
  };

  return (
    <div>
      <label htmlFor="province" className="block text-gray-700 font-medium mb-2">
        Province
      </label>
      <select
        id="province"
        name="province"
        onChange={handleProvinceChange}
        value={selectedProvince}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
      >
        <option value="">Select a province</option>
        {LocationName.map((province) => (
          <option key={province.province} value={province.province}>
            {province.province}
          </option>
        ))}
      </select>

      {selectedProvince && (
        <>
          <label htmlFor="district" className="block text-gray-700 font-medium mt-4 mb-2">
            District
          </label>
          <select
            id="district"
            name="district"
            onChange={handleDistrictChange}
            value={selectedDistrict}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="">Select a district</option>
            {LocationName.find((p) => p.province === selectedProvince).districts.map((district) => (
              <option key={district.district} value={district.district}>
                {district.district}
              </option>
            ))}
          </select>
        </>
      )}

      {selectedDistrict && (
        <>
          <label htmlFor="location" className="block text-gray-700 font-medium mt-4 mb-2">
            Location
          </label>
          <select
            id="location"
            name="address"
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          >
            <option value="">Select a location</option>
            {LocationName.find((p) => p.province === selectedProvince)
              .districts.find((d) => d.district === selectedDistrict)
              .locations.map((loc) => (
                <option key={loc.value} value={loc.value}>
                  {loc.label}
                </option>
              ))}
          </select>
        </>
      )}
    </div>
  );
};

export default LocationFilter;
