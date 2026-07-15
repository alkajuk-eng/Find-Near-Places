"use client";

import Image from "next/image";
import { useContext } from "react";

import { FavoriteContext } from "../app/context/FavoriteContext";

// Left navigation bar

export default function SideNavBar({ setShowFavorites }) {
  // Get favorite places

  const { favorites } = useContext(FavoriteContext);

  // Navigation menu

  const menu = [
    {
      id: 1,

      name: "Search",

      // Search icon

      logo: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z",
    },

    {
      id: 2,

      name: "Fav",

      // Heart icon

      logo: "M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z",
    },
  ];

  // Menu click handler

  const handleMenuClick = (item) => {
    console.log(
      "MENU CLICK:",

      item.name,
    );

    // Open favorites

    if (item.name === "Fav") {
      setShowFavorites(true);
    }

    // Return to search

    if (item.name === "Search") {
      setShowFavorites(false);
    }
  };

  return (
    <div
      className="
        w-24
        h-screen
        sticky
        top-0
        bg-white
        shadow-md
        flex
        flex-col
        items-center
        p-3
        gap-6
        z-20
      "
    >
      {/* Logo */}

      <Image src="/logo.png" alt="Logo" width={55} height={55} />

      {/* Menu buttons */}

      <div className="space-y-5">
        {menu.map((item) => (
          <div
            key={item.id}
            className="
            relative
          "
          >
            {/* SVG ICON */}

            <svg
              onClick={() => {
                handleMenuClick(item);
              }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="
              w-11
              h-11
              p-2
              cursor-pointer
              rounded-xl
              hover:bg-purple-100
              hover:text-purple-600
              transition
            "
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={item.logo}
              />
            </svg>

            {/* Favorite counter */}

            {item.name === "Fav" && favorites.length > 0 && (
              <span
                className="
              absolute
              -top-2
              -right-2
              bg-purple-600
              text-white
              text-xs
              font-bold
              w-5
              h-5
              rounded-full
              flex
              items-center
              justify-center
            "
              >
                {favorites.length}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
