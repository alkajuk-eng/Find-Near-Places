"use client";

import { useContext } from "react";

import { FavoriteContext } from "../app/context/FavoriteContext";

import { SelectedBusinessContext } from "../app/context/SelectedBusinessContext";

// Favorite places list
// Shows all saved places

export default function FavoriteList() {
  const { favorites } = useContext(FavoriteContext);

  const { setSelectedBusiness } = useContext(SelectedBusinessContext);

  if (favorites.length === 0) {
    return <p className="text-gray-500 mt-5">No favorites yet</p>;
  }

  return (
    <div className="mt-5 space-y-3">
      <h2 className="font-bold text-xl">My Favorites ❤️</h2>

      {favorites.map((place) => (
        <div
          key={place.place_id}
          onClick={() => {
            setSelectedBusiness(place);
          }}
          className="
              flex
              gap-3
              p-3
              border
              rounded-xl
              cursor-pointer
              hover:bg-purple-100
              transition
            "
        >
          <img
            src={
              place.photos?.length
                ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=100&photoreference=${place.photos[0].photo_reference}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
                : "/placeholder.png"
            }
            className="
                w-16
                h-16
                rounded-lg
                object-cover
              "
          />

          <div>
            <h3 className="font-bold">{place.name}</h3>

            <p className="text-sm text-gray-500">{place.vicinity}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
