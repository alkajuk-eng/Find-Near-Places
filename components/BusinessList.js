/* "use client";

import React, { useState } from "react";
import BusinessItem from "./BusinessItem";

function BusinessList({ places = [] }) {
  const [count, setCount] = useState(0);

  const pageSize = 5;

  const start = count * pageSize;
  const end = start + pageSize;

  const visiblePlaces = places.slice(start, end);

  return (
    <div>
      <h2 className="text-[20px] mt-3 font-bold mb-3 flex items-center justify-between">
        Top Nearby Places

        <span className="flex gap-2">
          {count > 0 && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-10 p-2 text-gray-400 hover:text-purple-500 hover:bg-purple-100 rounded-lg cursor-pointer"
              onClick={() => setCount(count - 3)}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              />
            </svg>
          )}

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-10 p-2 text-gray-400 hover:text-purple-500 hover:bg-purple-100 rounded-lg cursor-pointer"
            onClick={() => setCount(count + 3)}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </span>
      </h2>
      <div>
        {visiblePlaces.map((place, index) =>index>=count&&index<count+3&& (
          <BusinessItem key={index} place={place} />
        ))}
      </div>
    </div>
  );
}

export default BusinessList; 

 */

"use client";

import React, { useState, useEffect } from "react";
import BusinessItem from "./BusinessItem";
import ShimmerEfectItem from "./ShimmerEfectItem";

function BusinessList({ places = [], category }) {
  const [page, setPage] = useState(0);
  const [loader, setLoader] = useState(true);

  const pageSize = 5;

  const start = page * pageSize;
  const end = start + pageSize;

  const visiblePlaces = places.slice(start, end);

  const maxPage = Math.max(0, Math.ceil(places.length / pageSize) - 1);

  // reset when category OR places change
  useEffect(() => {
    setPage(0);
    setLoader(true);

    const timer = setTimeout(() => {
      setLoader(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [places, category]);

  const goNext = () => {
    setPage((prev) => Math.min(prev + 1, maxPage));
  };

  const goPrev = () => {
    setPage((prev) => Math.max(prev - 1, 0));
  };

  return (
    <div>
      <h2 className="text-[20px] mt-3 font-bold mb-3 flex items-center justify-between">
        Top Nearby Places

        <span className="flex gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            onClick={goPrev}
            className={`size-10 p-2 rounded-lg cursor-pointer ${
              page === 0
                ? "text-gray-200 cursor-not-allowed"
                : "text-gray-400 hover:text-purple-500 hover:bg-purple-100"
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            />
          </svg>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            onClick={goNext}
            className={`size-10 p-2 rounded-lg cursor-pointer ${
              page >= maxPage
                ? "text-gray-200 cursor-not-allowed"
                : "text-gray-400 hover:text-purple-500 hover:bg-purple-100"
            }`}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </span>
      </h2>

      <div>
        {!loader
          ? visiblePlaces.map((place, index) => (
              <BusinessItem key={start + index} place={place} />
            ))
          : [1, 2, 3, 4, 5].map((_, index) => (
              <ShimmerEfectItem key={index} />
            ))}
      </div>
    </div>
  );
}

export default BusinessList;