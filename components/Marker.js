"use client";

import { MarkerF } from "@react-google-maps/api";

// Marker for user's current GPS location

export default function UserLocationMarker({ userLocation }) {
  // Wait until GPS coordinates exist

  if (!userLocation) {
    return null;
  }

  return (
    <MarkerF
      // Current user position

      position={userLocation}
      icon={{
        // Image from public folder

        url: "/placeholder.png",

        // Marker size

        scaledSize: new window.google.maps.Size(
          50,
          50,
        ),
      }}
    />
  );
}
