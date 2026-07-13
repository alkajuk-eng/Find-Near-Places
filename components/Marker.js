"use client";

import React from "react";
import { MarkerF } from "@react-google-maps/api";

function UserLocationMarker({ userLocation }) {
  if (!userLocation) return null;

  return (
    <MarkerF
      position={userLocation}
      label="Me"
      icon={{
        url: "/placeholder.png",
        scaledSize: new window.google.maps.Size(50, 50),
        labelOrigin: new window.google.maps.Point(25, 65),
      }}
    />
  );
}

export default UserLocationMarker;