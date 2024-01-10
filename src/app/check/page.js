"use client";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';

export default function Check() {
  return (
    <div className="min-h-screen">
      <div className="w-[80vw] h-[50vh]">
        <MapContainer
          center={[51.505, -0.09]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[51.505, -0.09]}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
}
