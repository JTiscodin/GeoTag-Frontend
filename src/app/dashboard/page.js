"use client";

import Map from "@/components/Map";
import axios from "axios";
import { useEffect,useState } from "react";
import { resolve } from "styled-jsx/css";
export default function Dashboard() {

  const [spots, setSpots] = useState([])

  useEffect(() => {
    axios.get("http://localhost:3000/api/register").then((res) => setSpots(res.data))
    
  },[spots])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-[70vw] h-[70vh] text-center">
      <h1>Hello</h1>

        <Map
          width="800"
          height="400"
          zoom={12}
          spots = {spots}
        >
          {({ TileLayer, Marker, Popup }) => (
            <>
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
              />
              <Marker>
                <Popup>
                  A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
              </Marker>
            </>
          )}
        </Map>
        {spots.map((e) => <h1 key={e._id}>{e.username}</h1>)}
      </div>
    </div>
  );
}
