import React, { useState } from 'react';
import Select from 'react-select';
import useLocations from '../../hooks/job/joblist/useLocations.js';

const LocationDropdown = ({ onChange }) => {
  const { locations, loading, error } = useLocations();
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleChange = (selectedOption) => {
    setSelectedLocation(selectedOption);
    onChange(selectedOption);
  };

  const formatOptions = (locations) => {
    return [{ value: null, label: 'All Locations' }, ...locations.map((location) => ({
      value: location,
      label: location,
    }))];
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <Select
        value={selectedLocation}
        onChange={handleChange}
        options={formatOptions(locations)}
        isSearchable={true}
        placeholder="Select a location..."
      />
    </div>
  );
};

export default LocationDropdown;
