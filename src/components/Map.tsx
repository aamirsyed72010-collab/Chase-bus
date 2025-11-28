"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';
import { useTheme } from '@mui/material';

// Fix for default icon issue with webpack
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

interface Route {
  path: [number, number][];
  color: string;
}

interface MapProps {
  userLocation: [number, number] | null;
  routes: Route[];
}

function MapContent({ userLocation, routes }: MapProps) {
  const map = useMap();
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';

  useEffect(() => {
    if (userLocation) {
      map.setView(userLocation, map.getZoom());
    }
  }, [userLocation, map]);

  const position: [number, number] = [11.4531391, 79.6515867]; // Bhuvanagiri coordinates

  return (
    <>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <style jsx global>{`
        .leaflet-tile {
          filter: ${isDark ? 'invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%)' : 'none'};
        }
      `}</style>
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
      {routes && routes.map((route, index) => (
        <Polyline key={index} positions={route.path} color={route.color} />
      ))}
    </>
  );
}

export default function Map({ userLocation, routes }: MapProps) {
  const defaultPosition: [number, number] = [11.4531391, 79.6515867]; // Bhuvanagiri coordinates

  return (
    <MapContainer center={userLocation || defaultPosition} zoom={13} style={{ height: '100%', width: '100%' }}>
      <MapContent userLocation={userLocation} routes={routes} />
    </MapContainer>
  );
}
