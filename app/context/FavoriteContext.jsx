"use client";

import { createContext, useEffect, useState } from "react";

// Create Favorite Context

export const FavoriteContext = createContext();

export function FavoriteProvider({ children }) {
  // Store favorite places

  const [favorites, setFavorites] = useState([]);

  // Load favorites when app starts

  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");

    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);

  // Save favorites every time list changes

  useEffect(() => {
    localStorage.setItem(
      "favorites",

      JSON.stringify(favorites),
    );
  }, [favorites]);

  // Add place to favorites

  const addFavorite = (place) => {
    setFavorites((prev) => {
      const exists = prev.find((item) => item.place_id === place.place_id);

      // Prevent duplicates

      if (exists) {
        return prev;
      }

      return [...prev, place];
    });
  };

  // Remove place from favorites

  const removeFavorite = (place_id) => {
    setFavorites((prev) => prev.filter((item) => item.place_id !== place_id));
  };

  return (
    <FavoriteContext.Provider
      value={{
        favorites,

        addFavorite,

        removeFavorite,
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}
