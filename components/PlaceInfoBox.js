"use client";

import { useContext } from "react";
import { SelectedBusinessContext } from "../app/context/SelectedBusinessContext";

export default function PlaceInfoBox({ userLocation }) {
  const { selectedBusiness } = useContext(SelectedBusinessContext);

  // Ждем пока есть и GPS, и выбранное место
  if (!selectedBusiness || !userLocation) {
    return null;
  }

  const placeLat = Number(selectedBusiness.geometry.location.lat);
  const placeLng = Number(selectedBusiness.geometry.location.lng);

  const distance = calculateDistance(
    userLocation.lat,
    userLocation.lng,
    placeLat,
    placeLng
  );

  const openRoute = () => {
    const url = `https://www.google.com/maps/dir/${userLocation.lat},${userLocation.lng}/${placeLat},${placeLng}`;
    window.open(url, "_blank");
  };

  return (
    <div className="mt-5 rounded-xl border bg-white p-5 shadow-lg">

      <h2 className="text-xl font-bold">
        {selectedBusiness.name}
      </h2>

      <p className="mt-2 text-gray-600">
        {selectedBusiness.vicinity}
      </p>

      {selectedBusiness.rating && (
        <p className="mt-2">
          ⭐ {selectedBusiness.rating}
        </p>
      )}

      <p className="mt-2">
        📍 Distance: <strong>{distance.toFixed(2)} km</strong>
      </p>

      <button
        onClick={openRoute}
        className="mt-4 rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
      >
        🚗 Get Directions
      </button>

    </div>
  );
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;

  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}