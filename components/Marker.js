"use client";

import { MarkerF } from "@react-google-maps/api";

export default function UserLocationMarker({ userLocation }) {

  return (
    <MarkerF
      position={userLocation}
      icon={{
        url: "/user-marker.png",
        scaledSize: new window.google.maps.Size(50, 50),
      }}
    />
  );
}