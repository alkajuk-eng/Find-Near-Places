import React from "react";

import Image from "next/image";

// Display single business card

function BusinessItem({ place }) {
  // Google API key for loading business photos
  const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

  // Business name
  const name = place?.name;

  // Business address
  // Google Places can return different address fields
  const address = place?.vicinity || place?.formatted_address;

  // Business rating
  const rating = place?.rating || "N/A";

  // Get first photo reference from Google Places API
  const photoRef = place?.photos?.[0]?.photo_reference;

  // Create Google photo URL
  const photoUrl = photoRef
    ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${photoRef}&key=${GOOGLE_API_KEY}`
    : "/businessItem.jpg";

  return (
    <div
      className="
        flex
        gap-3
        p-3
        border-b
        border-purple-300
        mb-4
        items-center
      "
    >
      {/* Business image */}

      <Image
        src={photoUrl}
        alt={name || "Business image"}
        width={90}
        height={90}
        className="
          rounded-xl
          object-cover
        "
        loading="lazy"
      />

      {/* Business information */}

      <div>
        {/* Business name */}

        <h2
          className="
          text-[20px]
          font-semibold
        "
        >
          {name || "Unknown Business"}
        </h2>

        {/* Business address */}

        <h2
          className="
          text-[15px]
          text-gray-500
        "
        >
          {address || "No address"}
        </h2>

        {/* Rating section */}

        <div
          className="
          flex
          gap-2
          items-center
        "
        >
          {/* Star icon */}

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="
              size-4
              text-yellow-500
            "
          >
            <path
              fillRule="evenodd"
              d="
              M10.788 3.21c.448-1.077 
              1.976-1.077 2.424 0l2.082 
              5.006 5.404.434c1.164.093 
              1.636 1.545.749 2.305l-4.117 
              3.527 1.257 5.273c.271 
              1.136-.964 2.033-1.96 
              1.425L12 18.354 7.373 
              21.18c-.996.608-2.231-.29-1.96-1.425
              l1.257-5.273-4.117-3.527
              c-.887-.76-.415-2.212.749-2.305
              l5.404-.434 2.082-5.005Z
              "
              clipRule="evenodd"
            />
          </svg>

          {/* Rating value */}

          <h2>{rating}</h2>
        </div>
      </div>
    </div>
  );
}

export default BusinessItem;
