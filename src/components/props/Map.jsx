import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GoogleMap, Marker } from '@react-google-maps/api';

const containerStyle = {
    width: '100%',
    height: '500px',
};

const SimpleMap = ({ name, height = '500px', width = '100%' }) => {
    const [center, setCenter] = useState({ lat: 0, lng: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCoordinates = async () => {
            if (!name) return;

            try {
                const apiKey = 'AIzaSyC73yaRGGiQ-W1qpni-3WlKJJ3A1vWtmUs';
                const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
                    params: {
                        address: name,
                        key: apiKey,
                    },
                });

                const location = response.data.results[0]?.geometry.location;

                if (location) {
                    setCenter(location);
                } else {
                    console.error('No results found for the location');
                }
            } catch (error) {
                console.error('Error fetching coordinates:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCoordinates();
    }, [name]);

    return (
        <div style={{ marginTop: '1rem', marginBottom: '1rem', width: '100%' }}>
            {loading ? '' : (
                <GoogleMap
                    mapContainerStyle={{
                        height: height,
                        width: width,
                    }}
                    center={center}
                    zoom={15}
                >
                    <Marker position={center} />
                </GoogleMap>
                
            )}
        </div>
    );
};

export default SimpleMap;
