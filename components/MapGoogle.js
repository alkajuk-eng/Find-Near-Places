"use client";

import { useContext, useState } from "react";

import {
  GoogleMap,
  LoadScript,
  MarkerF,
  InfoWindow,
} from "@react-google-maps/api";

import UserLocationMarker from "./Marker";

import { SelectedBusinessContext } from "../app/context/SelectedBusinessContext";

// Google Map component
// Shows:
// 1. User GPS location
// 2. Nearby places markers
// 3. Selected place information
// 4. My Location button

export default function MapGoogle({
  userLocation,

  places,

  selectedCategory,
}) {
  // Store Google Map instance
  // We need it to move the map later

  const [map, setMap] = useState(null);

  // Selected business from context

  const {
    selectedBusiness,

    setSelectedBusiness,
  } = useContext(SelectedBusinessContext);

  // Return marker icon depending on category

  const getMarkerIcon = () => {
    switch (selectedCategory) {
      case "gas_station":
        return "/petrol-station.png";

      case "restaurant":
        return "/restaurant.png";

      case "hotel":
        return "/hotel.png";

      default:
        return "/placeholder.png";
    }
  };

  // Move camera back to user's GPS position

  const goToMyLocation = () => {
    if (map && userLocation) {
      map.panTo(userLocation);

      map.setZoom(15);
    }
  };

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}>
      {userLocation && (
        <div className="relative">
          <GoogleMap
            // Map size

            mapContainerStyle={{
              width: "100%",

              height: "400px",

              borderRadius: "20px",
            }}
            // Initial map center

            center={userLocation}
            zoom={14}
            // Save map object

            onLoad={(map) => {
              setMap(map);
            }}
          >
            {/* User current location marker */}

            <UserLocationMarker userLocation={userLocation} />

            {/* Nearby places markers */}

            {places?.map((place, index) => (
              <MarkerF
                key={index}
                position={{
                  lat: Number(place.geometry.location.lat),

                  lng: Number(place.geometry.location.lng),
                }}
                // Category icon

                icon={{
                  url: getMarkerIcon(),

                  scaledSize: new window.google.maps.Size(
                    40,

                    40,
                  ),
                }}
                // Select place

                onClick={() => {
                  setSelectedBusiness(place);
                }}
              />
            ))}

            {/* Information window above marker */}

            {selectedBusiness && (
              <InfoWindow
                position={{
                  lat: Number(selectedBusiness.geometry.location.lat),
                  lng: Number(selectedBusiness.geometry.location.lng),
                }}
                onCloseClick={() => {
                  setSelectedBusiness(null);
                }}
              >
                <div>
                  <h3 className="font-bold">{selectedBusiness.name}</h3>
                  <p>{selectedBusiness.vicinity}</p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>

          {/* 
          Button:
          Return map to user's location

          Position:
          Bottom Left
        */}

          <button
            onClick={goToMyLocation}
            className="
            absolute
            left-4
            bottom-4
            bg-white
            shadow-lg
            rounded-full
            w-12
            h-12
            flex
            items-center
            justify-center
            hover:bg-purple-100
            transition
          "
          >
            {/* GPS SVG icon */}

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-7 h-7 text-purple-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="
                  M12 21
                  a9 9 0 1 0 0 -18
                  a9 9 0 0 0 0 18
                  z
                  M12 15
                  a3 3 0 1 0 0 -6
                  a3 3 0 0 0 0 6
                  z
                "
              />
            </svg>
          </button>
        </div>
      )}
    </LoadScript>
  );
}
