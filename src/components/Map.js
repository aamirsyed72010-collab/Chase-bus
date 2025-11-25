"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from 'react-leaflet'; // Import Polyline
import L from 'leaflet';
import { useEffect } from 'react';

// Fix for default icon issue with webpack
// This approach is often more compatible with newer Leaflet versions and build tools.
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

function MapContent({ userLocation, routes }) { // Accept routes prop
  const map = useMap();

  useEffect(() => {
    if (userLocation) {
      map.setView(userLocation, map.getZoom());
    }
  }, [userLocation, map]);

  const position = [11.4531391, 79.6515867]; // Bhuvanagiri coordinates

  return (
    <>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>
          Bhuvanagiri, Tamil Nadu 608601
        </Popup>
      </Marker>
      {userLocation && (
        <Marker position={userLocation}>
          <Popup>Your Current Location</Popup>
        </Marker>
      )}
      {routes && routes.map((route, index) => ( // Render polylines for routes
        <Polyline key={index} positions={route.path} color={route.color} />
      ))}
    </>
  );
}

export default function Map({ userLocation, routes }) { // Accept routes prop
  const defaultPosition = [11.4531391, 79.6515867]; // Bhuvanagiri coordinates

  return (
    <MapContainer center={userLocation || defaultPosition} zoom={13} style={{ height: '100%', width: '100%' }}>
      <MapContent userLocation={userLocation} routes={routes} /> {/* Pass routes to MapContent */}
    </MapContainer>
  );
}
