import React, { createContext, useContext, useState, useEffect } from 'react';
import { LoadScript } from '@react-google-maps/api';

const GoogleMapsContext = createContext();

export const GoogleMapsProvider = ({ children }) => {
  // Get API key from environment variables
  const apiKey =  import.meta.env?.VITE_GOOGLE_MAPS_API_KEY;
  
  // Initialize state with null to avoid SSR issues
  const [isLoading, setIsLoading] = useState(true);
  const [googleAvailable, setGoogleAvailable] = useState(false);

  // Check if window is defined (client-side)
  const isBrowser = typeof window !== 'undefined';

  useEffect(() => {
    if (isBrowser) {
      // Check if Google Maps is already loaded
      if (window.google && window.google.maps) {
        setIsLoading(false);
        setGoogleAvailable(true);
      }
    }
  }, []);

  if (!apiKey) {
    console.error('Google Maps API key is not defined in environment variables');
    return children; // Gracefully render children without Maps functionality
  }

  // Handle server-side rendering
  if (!isBrowser) {
    return children; // Return children directly during SSR
  }

  return (
    <GoogleMapsContext.Provider 
      value={{ 
        apiKey, 
        isLoading,
        googleAvailable 
      }}
    >
      {!googleAvailable ? (
        <LoadScript
          googleMapsApiKey={apiKey}
          onLoad={() => {
            setIsLoading(false);
            setGoogleAvailable(true);
          }}
          onError={(error) => {
            console.error('Error loading Google Maps:', error);
            setIsLoading(false);
          }}
        >
          {children}
        </LoadScript>
      ) : (
        children
      )}
    </GoogleMapsContext.Provider>
  );
};

// Custom hook with error handling
export const useGoogleMaps = () => {
  const context = useContext(GoogleMapsContext);
  if (context === undefined) {
    throw new Error('useGoogleMaps must be used within a GoogleMapsProvider');
  }
  return context;
};

// Usage example component
export const GoogleMapsWrapper = ({ children }) => {
  const { isLoading, googleAvailable } = useGoogleMaps();

  if (isLoading) {
    return <div>Loading Google Maps...</div>;
  }

  if (!googleAvailable) {
    return <div>Google Maps failed to load</div>;
  }

  return children;
};