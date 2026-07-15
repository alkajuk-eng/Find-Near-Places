"use client";

import { useContext } from "react";

import { SelectedBusinessContext } from "../app/context/SelectedBusinessContext";

export default function PlaceInfoBox({ userLocation }) {
  // Get selected business from global context

  const { selectedBusiness } = useContext(SelectedBusinessContext);

  // Wait until user location and selected place are available

  if (
    !selectedBusiness ||
    !userLocation ||
    !selectedBusiness.geometry ||
    !selectedBusiness.geometry.location
  ) {
    return null;
  }

  // Selected place coordinates

  const placeLat = Number(selectedBusiness.geometry.location.lat);

  const placeLng = Number(selectedBusiness.geometry.location.lng);

  // Calculate distance between user and selected place

  const distance = calculateDistance(
    userLocation.lat,

    userLocation.lng,

    placeLat,

    placeLng,
  );

  // Open Google Maps route

  const openRoute = () => {
    const url = `https://www.google.com/maps/dir/${userLocation.lat},${
      userLocation.lng
    }/${placeLat},${placeLng}`;

    window.open(
      url,

      "_blank",
    );
  };

  return (
    <div
      className="
        mt-5
        rounded-xl
        border
        bg-white
        p-5
        shadow-lg
      "
    >
      {/* Business name */}

      <h2 className="text-xl font-bold">{selectedBusiness.name}</h2>

      {/* Business address */}

      <p className="mt-2 text-gray-600">{selectedBusiness.vicinity}</p>

      {/* Rating */}

      {selectedBusiness.rating && (
        <p className="mt-2">⭐ {selectedBusiness.rating}</p>
      )}

      {/* Distance information */}

      <p className="mt-2">
        📍 Distance:
        <strong> {distance.toFixed(2)} km</strong>
      </p>

      {/* Open route button */}

      <button
        onClick={openRoute}
        className="
          mt-4
          rounded-lg
          bg-blue-600
          px-5
          py-2
          text-white
          hover:bg-blue-700
        "
      >
        🚗 Get Directions
      </button>
    </div>
  );
}

// Calculate distance between two GPS coordinates

// Uses the Haversine formula

function calculateDistance(
  lat1,
  lon1,
  lat2,
  lon2,
) {
  // Earth radius in kilometers

  const R = 6371;

  // Convert degrees to radians

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
    Math.cos((lat2 * Math.PI) / 180) *
    Math.sin(dLon / 2) ** 2;

  const c =
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a),
    );

  // Return distance in kilometers

  return R * c;
}
