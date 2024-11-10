import React, { createContext, useContext, useState } from 'react';
import { LoadScript, useLoadScript } from '@react-google-maps/api';

const GoogleMapsContext = createContext();

export const GoogleMapsProvider = ({ children }) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: apiKey,
  });

  if (loadError) {
    return <div>Error loading Google Maps</div>;
  }

  return (
    <GoogleMapsContext.Provider value={{ isLoaded }}>
      {isLoaded ? children : <div>Loading...</div>}
    </GoogleMapsContext.Provider>
  );
};

export const useGoogleMaps = () => useContext(GoogleMapsContext);
