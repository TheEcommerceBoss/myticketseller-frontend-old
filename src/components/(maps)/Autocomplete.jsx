import React, { useState } from 'react';
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_MAP_API;

const MapAutocomplete = ({ onAddressSelect }) => {
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: GOOGLE_MAPS_API_KEY,
        libraries: ['places'],
    });

    const [autocomplete, setAutocomplete] = useState(null);
    const [address, setAddress] = useState('');

    const handlePlaceChanged = () => {
        if (autocomplete) {
            const place = autocomplete.getPlace();
            const selectedAddress = place.formatted_address || place.name;
            setAddress(selectedAddress);
            onAddressSelect(selectedAddress);  // Pass the selected address back to the parent
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
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="p-3 w-full bg-transparent border rounded-lg"
                style={{ width: '100%' }}
            />
        </Autocomplete>
    );
};

export default MapAutocomplete;
