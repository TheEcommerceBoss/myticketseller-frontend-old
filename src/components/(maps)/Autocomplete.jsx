import React, { useState } from 'react';
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_MAP_API;

const MapAutocomplete = ({ value, onChange }) => {
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
        className="p-3 w-full bg-transparent border rounded-lg"
        style={{ width: '100%' }}
      />
    </Autocomplete>
  );
};

export default MapAutocomplete;