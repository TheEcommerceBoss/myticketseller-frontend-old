import  { createContext, useContext } from 'react';
import { LoadScript, useLoadScript } from '@react-google-maps/api';

const GoogleMapsContext = createContext<any>(null);

export const GoogleMapsProvider = ({ children }: {children: React.ReactNode}) => {
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
