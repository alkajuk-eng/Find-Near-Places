"use client";

import React, { useState } from "react";

function SearchBar({ onSearch }) {
  // Store current search input value
  const [searchText, setSearchText] = useState("");

  // Handle search when user presses Enter key
  const handleSearch = (e) => {
    if (e.key === "Enter" && searchText.trim() !== "") {
      // Send search text to parent component
      onSearch(searchText);
    }
  };

  return (
    <div
      className="
        flex
        gap-3
        bg-purple-100
        p-3
        rounded-xl
      "
    >
      {/* Search icon */}

      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="
          size-6
          text-purple-400
        "
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>

      {/* Search input */}

      <input
        type="text"
        placeholder="Search place..."
        // Controlled input

        value={searchText}
        // Update text while typing

        onChange={(e) => setSearchText(e.target.value)}
        // Run search on Enter

        onKeyDown={handleSearch}
        className="
          outline-none
          w-full
          text-[17px]
          placeholder-purple-400
        "
      />
    </div>
  );
}

export default SearchBar;
