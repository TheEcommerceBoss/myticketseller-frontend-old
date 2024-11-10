import React, { createContext, useContext, useState, useEffect } from 'react';
import { LoadScript } from '@react-google-maps/api';

const GoogleMapsContext = createContext();

export const GoogleMapsProvider = ({ children }) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY; // Access the API key with Vite's import.meta.env
  const [isLoading, setIsLoading] = useState(!window.google);

  useEffect(() => {
    if (window.google && window.google.maps) {
      setIsLoading(false); // Skip loading if the API is already loaded
    }
  }, []);

  return (
    <GoogleMapsContext.Provider value={{ apiKey, isLoading }}>
      {!window.google ? (
        <LoadScript
          googleMapsApiKey={apiKey}
          onLoad={() => setIsLoading(false)}
          onError={() => setIsLoading(false)}
        >
          {children}
        </LoadScript>
      ) : (
        children
      )}
    </GoogleMapsContext.Provider>
  );
};

export const useGoogleMaps = () => useContext(GoogleMapsContext);
