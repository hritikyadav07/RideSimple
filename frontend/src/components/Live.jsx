import React, { useState, useEffect } from 'react'
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api'

const containerStyle = {
    width: '100%',
    height: '100%',
};

const center = {
    lat: -3.745,
    lng: -38.523
};

// Added dark theme styles for Google Maps
const darkThemeStyle = [
    { elementType: "geometry", stylers: [{ color: "#212121" }] },
    { elementType: "labels.icon", stylers: [{ visibility: "off" }] },
    { elementType: "labels.text.fill", stylers: [{ color: "#757575" }] },
    { elementType: "labels.text.stroke", stylers: [{ color: "#212121" }] },
    {
        featureType: "administrative",
        elementType: "geometry",
        stylers: [{ color: "#757575" }]
    },
    {
        featureType: "administrative.country",
        elementType: "labels.text.fill",
        stylers: [{ color: "#9e9e9e" }]
    },
    {
        featureType: "administrative.land_parcel",
        stylers: [{ visibility: "off" }]
    },
    {
        featureType: "administrative.locality",
        elementType: "labels.text.fill",
        stylers: [{ color: "#bdbdbd" }]
    },
    {
        featureType: "poi",
        elementType: "labels.text.fill",
        stylers: [{ color: "#757575" }]
    },
    {
        featureType: "poi.park",
        elementType: "geometry",
        stylers: [{ color: "#181818" }]
    },
    {
        featureType: "poi.park",
        elementType: "labels.text.fill",
        stylers: [{ color: "#616161" }]
    },
    {
        featureType: "poi.park",
        elementType: "labels.text.stroke",
        stylers: [{ color: "#1b1b1b" }]
    },
    {
        featureType: "road",
        elementType: "geometry.fill",
        stylers: [{ color: "#2c2c2c" }]
    },
    {
        featureType: "road",
        elementType: "labels.text.fill",
        stylers: [{ color: "#8a8a8a" }]
    },
    {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [{ color: "#373737" }]
    },
    {
        featureType: "road.highway",
        elementType: "geometry",
        stylers: [{ color: "#3c3c3c" }]
    },
    {
        featureType: "road.highway.controlled_access",
        elementType: "geometry",
        stylers: [{ color: "#4e4e4e" }]
    },
    {
        featureType: "road.local",
        elementType: "labels.text.fill",
        stylers: [{ color: "#616161" }]
    },
    {
        featureType: "transit",
        elementType: "labels.text.fill",
        stylers: [{ color: "#757575" }]
    },
    {
        featureType: "water",
        elementType: "geometry",
        stylers: [{ color: "#000000" }]
    },
    {
        featureType: "water",
        elementType: "labels.text.fill",
        stylers: [{ color: "#3d3d3d" }]
    }
];

const LiveTracking = () => {
    const [ currentPosition, setCurrentPosition ] = useState(center);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            setCurrentPosition({
                lat: latitude,
                lng: longitude
            });
        });

        const watchId = navigator.geolocation.watchPosition((position) => {
            const { latitude, longitude } = position.coords;
            setCurrentPosition({
                lat: latitude,
                lng: longitude
            });
        });

        return () => navigator.geolocation.clearWatch(watchId);
    }, []);

    useEffect(() => {
        const updatePosition = () => {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;

                // console.log('Position updated:', latitude, longitude);
                setCurrentPosition({
                    lat: latitude,
                    lng: longitude
                });
            });
        };

        updatePosition(); // Initial position update

        const intervalId = setInterval(updatePosition, 10000); // Update every 10 seconds

    }, []);

    return (
        <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}>
            <GoogleMap
                mapContainerStyle={containerStyle}
                center={currentPosition}
                zoom={15}
                options={{ styles: darkThemeStyle }} // applied dark theme
            >
                <Marker position={currentPosition} />
            </GoogleMap>
        </LoadScript>
    )
}

export default LiveTracking