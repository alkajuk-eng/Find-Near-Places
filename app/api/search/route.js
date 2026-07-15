import { NextResponse } from "next/server";

// API route for searching places by text
//
// Example:
// /api/search?query=restaurant
//
// This route sends request to Google Places Text Search API

export async function GET(request) {
  try {
    // Get query parameters from URL

    const { searchParams } = new URL(request.url);

    // Get user search text

    const query = searchParams.get("query");

    // Check if search text exists

    if (!query) {
      return NextResponse.json(
        {
          error: "Search query is missing",
        },

        {
          status: 400,
        },
      );
    }

    // Google Places Text Search API URL

    const url = `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
      query,
    )}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`;

    // Send request to Google API

    const response = await fetch(url);

    // Convert response to JSON

    const data = await response.json();

    // Return Google results back to frontend

    return NextResponse.json(data);
  } catch (error) {
    // Handle server errors

    console.log(
      "SEARCH API ERROR:",

      error,
    );

    return NextResponse.json(
      {
        error: "Failed to search places",
      },

      {
        status: 500,
      },
    );
  }
}
