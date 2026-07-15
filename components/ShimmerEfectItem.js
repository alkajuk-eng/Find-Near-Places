import React from "react";

// Loading placeholder card

// Shown while business data is loading

function ShimmerEffectItem() {
  return (
    <div
      className="
        mx-auto
        w-full
        max-w-sm
        rounded-md
        border
        border-gray-200
        p-4
      "
    >
      <div
        className="
          flex
          animate-pulse
          space-x-4
        "
      >
        {/* Image placeholder */}

        <div
          className="
            size-16
            rounded-lg
            bg-gray-200
          "
        />

        <div
          className="
            flex-1
            space-y-4
            py-1
          "
        >
          {/* Title placeholder */}

          <div
            className="
              h-3
              rounded
              bg-gray-200
              w-3/4
            "
          />

          {/* Address placeholder */}

          <div
            className="
              h-2
              rounded
              bg-gray-200
            "
          />

          {/* Rating placeholder */}

          <div
            className="
              h-2
              rounded
              bg-gray-200
              w-1/3
            "
          />
        </div>
      </div>
    </div>
  );
}

export default ShimmerEffectItem;
