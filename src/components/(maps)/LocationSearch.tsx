import React, { useState } from 'react';
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_MAP_API;

const LocationSearch = ({ value, onChange }) => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
    libraries: ['places'],
  });

  const [autocomplete, setAutocomplete] = useState(null);

  const handlePlaceChanged = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      const selectedAddress = place.formatted_address || place.name;
      onChange(selectedAddress);
    }
  };

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <Autocomplete
      onLoad={(autocompleteInstance) => setAutocomplete(autocompleteInstance)}
      onPlaceChanged={handlePlaceChanged}
    >
      <input
        type="text"
        placeholder="Enter event location"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="px-4 py-2 flex w-[400px] bg-transparent text-black outline-none  border border-[#d1d5db] rounded-sm"
        style={{ width: '100%' }}
      />
    </Autocomplete>
  );
};

export default LocationSearch;