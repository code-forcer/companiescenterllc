// components/MapComponent.js
import dynamic from 'next/dynamic';
import { useEffect } from 'react';
import 'leaflet/dist/leaflet.css';

const DynamicMap = dynamic(() => import('react-leaflet').then(module => module.MapContainer), {
  ssr: false,
});

const TileLayer = dynamic(() => import('react-leaflet').then(module => module.TileLayer), {
  ssr: false,
});

const Marker = dynamic(() => import('react-leaflet').then(module => module.Marker), {
  ssr: false,
});

const Popup = dynamic(() => import('react-leaflet').then(module => module.Popup), {
  ssr: false,
});

const MapComponent = () => {
  const position = [51.505, -0.09];

    return (
        <>
    <h1 style={{padding:'2px',textDecoration:'underline',color:'#102343'}}>Companies on Maps</h1>
    <div style={{ height: '300px', width: '100%',border:'1px solid #102343',borderRadius:'4px' }}>
      <DynamicMap center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          <Popup>
            A pretty popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </DynamicMap>
            </div>
            </>
  );
};

export default MapComponent;
