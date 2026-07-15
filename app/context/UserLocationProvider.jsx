"use client";

import { useState, useEffect } from "react";

import { UserLocationContext } from "./UserLocationContext";

import { getUserLocation } from "../utils/getUserLocation";

// UserLocationProvider is a global storage for user's GPS location
//
// It allows any component inside the app to access:
// - current latitude
// - current longitude
//
// Components using this context:
// - MapGoogle
// - UserLocationMarker
// - PlaceInfoBox
// - Search nearby places

export default function UserLocationProvider({ children }) {
  // State that stores user's current GPS coordinates
  //
  // Example:
  // {
  //    lat: 52.4862,
  //    lng: -1.8904
  // }

  const [userLocation, setUserLocation] = useState(null);

  // Get user location when application starts
  //
  // This runs only once because of empty dependency array []

  useEffect(() => {
    // Call browser GPS function

    getUserLocation()
      // If location is successfully received

      .then((coords) => {
        console.log(
          "USER LOCATION:",

          coords,
        );

        // Save coordinates into global state

        setUserLocation(coords);
      })

      // If user blocks location or GPS fails

      .catch((error) => {
        console.log(
          "LOCATION ERROR:",

          error,
        );
      });
  }, []);

  return (
    // Provide location data to all child components

    // inside the application

    <UserLocationContext.Provider
      value={{
        // Current user GPS position

        userLocation,

        // Function to update location manually

        setUserLocation,
      }}
    >
      {children}
    </UserLocationContext.Provider>
  );
}
