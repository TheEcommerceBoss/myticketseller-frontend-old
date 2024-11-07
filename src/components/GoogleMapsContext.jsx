import React, { createContext, useContext, useState, useEffect } from 'react';
import { LoadScript } from '@react-google-maps/api';

const GoogleMapsContext = createContext();

export const GoogleMapsProvider = ({ children }) => {
  const apiKey = 'AIzaSyC73yaRGGiQ-W1qpni-3WlKJJ3A1vWtmUs'; 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if Google Maps script is already loaded
    if (window.google && window.google.maps) {
      setIsLoading(false); // Skip loading if the API is already loaded
    }
  }, []);

  return (
    <GoogleMapsContext.Provider value={{ apiKey, isLoading }}>
      <LoadScript
        googleMapsApiKey={apiKey}
        onLoad={() => setIsLoading(false)}
        onError={() => setIsLoading(false)} // handle potential errors as well
      >
        {children}
      </LoadScript>
    </GoogleMapsContext.Provider>
  );
};

export const useGoogleMaps = () => useContext(GoogleMapsContext);
