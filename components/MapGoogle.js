"use client";

import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import UserLocationMarker from "./Marker"; // или "./UserLocationMarker"

function MapGoogle({ userLocation }) {
  const containerStyle = {
    width: "100%",
    height: "400px",
    borderRadius: "20px",
  };

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}>
      {userLocation && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={userLocation}
          zoom={14}
        >
          <UserLocationMarker userLocation={userLocation} />
        </GoogleMap>
      )}
    </LoadScript>
  );
}

export default MapGoogle;