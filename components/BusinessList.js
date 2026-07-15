"use client";

import { useState, useEffect, useContext } from "react";

import { SelectedBusinessContext } from "../app/context/SelectedBusinessContext";

import { FavoriteContext } from "../app/context/FavoriteContext";

// Business list component
// Shows places from Google Places API
// Features:
// - Pagination
// - Select place
// - Highlight selected place
// - Favorites

export default function BusinessList({ places, loading }) {
  // Current page number

  const [page, setPage] = useState(0);

  // Selected place context

  const { selectedBusiness, setSelectedBusiness } = useContext(
    SelectedBusinessContext,
  );

  // Favorites context

  const { addFavorite, removeFavorite, favorites } =
    useContext(FavoriteContext);

  // Number of items per page

  const pageSize = 5;

  // Reset page after new search

  useEffect(() => {
    setPage(0);
  }, [places]);

  // Pagination calculation

  const start = page * pageSize;

  const visiblePlaces = places.slice(start, start + pageSize);

  const showPrev = page > 0;

  const showNext = start + pageSize < places.length;

  // Check favorite

  const isFavorite = (place) => {
    return favorites.some((item) => item.place_id === place.place_id);
  };

  // Loading animation

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((item) => (
          <div
            key={item}
            className="
              flex
              gap-3
              p-3
              border
              rounded-xl
              animate-pulse
            "
          >
            <div
              className="
                w-20
                h-20
                bg-gray-300
                rounded-lg
              "
            />

            <div className="flex-1 space-y-3">
              <div
                className="
                  h-4
                  bg-gray-300
                  rounded
                  w-3/4
                "
              />

              <div
                className="
                  h-3
                  bg-gray-300
                  rounded
                "
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // No places

  if (!places || places.length === 0) {
    return <p className="mt-5 text-gray-500">No places found</p>;
  }

  return (
    <div className="relative mt-5">
      {/* Previous button */}

      {showPrev && (
        <button
          onClick={() => {
            setPage(page - 1);
          }}
          className="
              absolute
              -left-12
              top-1/2
              -translate-y-1/2
              w-9
              h-9
              rounded-full
              bg-white
              shadow-md
              z-10
            "
        >
          ◀
        </button>
      )}

      {/* Places list */}

      <div className="space-y-3">
        {visiblePlaces.map((place, index) => (
          <div
            key={place.place_id || index}
            // Select business

            onClick={() => {
              setSelectedBusiness(place);
            }}
            // Active selected style

            className={`

                flex

                gap-4

                p-3

                border

                rounded-xl

                cursor-pointer

                transition-all

                duration-300


                ${
                  selectedBusiness?.place_id === place.place_id
                    ? `
                    border-purple-500
                    bg-purple-100
                    shadow-xl
                    scale-[1.02]
                  `
                    : `
                    bg-white
                    hover:shadow-lg
                  `
                }

              `}
          >
            {/* Place image */}

            <img
              src={
                place.photos?.length
                  ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=200&photoreference=${place.photos[0].photo_reference}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
                  : "/placeholder.png"
              }
              alt={place.name}
              className="
                  w-20
                  h-20
                  rounded-lg
                  object-cover
                "
            />

            {/* Place information */}

            <div className="flex-1">
              <div className="flex justify-between">
                <h3 className="font-bold">{place.name}</h3>

                {/* Favorite button */}

                <button
                  onClick={(e) => {
                    // Prevent card click

                    e.stopPropagation();

                    if (isFavorite(place)) {
                      removeFavorite(place.place_id);
                    } else {
                      addFavorite(place);
                    }
                  }}
                  className="text-2xl"
                >
                  {isFavorite(place) ? "❤️" : "🤍"}
                </button>
              </div>

              {/* Address */}

              <p className="text-sm text-gray-600">{place.vicinity}</p>

              {/* Rating */}

              {place.rating && <p className="mt-1">⭐ {place.rating}</p>}
            </div>
          </div>
        ))}
      </div>

      {/* Next button */}

      {showNext && (
        <button
          onClick={() => {
            setPage(page + 1);
          }}
          className="
              absolute
              -right-12
              top-1/2
              -translate-y-1/2
              w-9
              h-9
              rounded-full
              bg-white
              shadow-md
              z-10
            "
        >
          ▶
        </button>
      )}
    </div>
  );
}
